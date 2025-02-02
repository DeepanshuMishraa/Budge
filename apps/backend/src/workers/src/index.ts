import { Hono } from "hono";

interface Env {
	AI: {
		run: (model: string, params: any) => Promise<any>;
	};
	DB: D1Database;
	VECTOR_INDEX: {
		upsert: (vectors: { id: string; values: number[] }[]) => Promise<any>;
		query: (values: number[], params: { topK: number }) => Promise<any>;
	};
	RAG_WORKFLOW: {
		create: (params: { params: { text: string } }) => Promise<void>;
	};
}

interface WorkflowStep {
	do: <T>(name: string, fn: () => Promise<T>) => Promise<T>;
	env: Env;
}

interface WorkflowEvent {
	params: {
		text: string;
	};
}

interface Note {
	id: number;
	text: string;
}

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
	const question = c.req.query('text') || "What is the best pizza topping"

	const embeddings = await c.env.AI.run('@cf/baai/bge-base-en-v1.5', { text: question })
	const vectors = embeddings.data[0]

	const vectorQuery = await c.env.VECTOR_INDEX.query(vectors, { topK: 1 });
	let vecId;
	if (vectorQuery.matches && vectorQuery.matches.length > 0 && vectorQuery.matches[0]) {
		vecId = vectorQuery.matches[0].id;
	} else {
		console.log("No matching vector found or vectorQuery.matches is empty");
	}

	let notes: string[] = [];
	if (vecId) {
		const query = `SELECT * FROM notes WHERE id = ?`
		const { results } = await c.env.DB.prepare(query).bind(vecId).all()
		if (results) notes = results.map((vec: any) => vec.text as string);
	}

	const contextMessage = notes.length
		? `Context:\n${notes.map(note => `- ${note}`).join("\n")}`
		: ""

	const systemPrompt = `When answering the question or responding, use the context provided, if it is provided and relevant.`

	const { response: answer } = await c.env.AI.run(
		'@cf/meta/llama-3-8b-instruct',
		{
			messages: [
				...(notes.length ? [{ role: 'system', content: contextMessage }] : []),
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: question }
			]
		}
	)

	return c.text(answer);
});

app.onError((err, c) => {
	return c.text(err.toString());
});

app.post('/notes', async (c) => {
	const { text } = await c.req.json();
	if (!text) return c.text("Missing text", 400);
	await c.env.RAG_WORKFLOW.create({ params: { text } })
	return c.text("Created note", 201);
})

export default app;

export class RAGWorkflow {
	async run(event: WorkflowEvent, step: WorkflowStep) {
		const { text } = event.params;

		const record = await step.do(`create database record`, async () => {
			const query = "INSERT INTO notes (text) VALUES (?) RETURNING *";

			const { results } = await step.env.DB.prepare(query)
				.bind(text)
				.run();

			const result = results[0] as Record<string, unknown>;
			if (!result?.id || typeof result.id !== 'number' || !result?.text || typeof result.text !== 'string') {
				throw new Error("Failed to create note: Invalid record format");
			}

			return { id: result.id, text: result.text } as Note;
		});

		const embedding = await step.do(`generate embedding`, async () => {
			const embeddings = await step.env.AI.run('@cf/baai/bge-base-en-v1.5', { text: text });
			const values = embeddings.data[0];
			if (!values) throw new Error("Failed to generate vector embedding");
			return values;
		});

		await step.do(`insert vector`, async () => {
			return step.env.VECTOR_INDEX.upsert([
				{
					id: record.id.toString(),
					values: embedding,
				}
			]);
		});
	}
}
