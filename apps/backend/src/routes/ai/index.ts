import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";

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

export const aiRouter = new Hono<{ Bindings: Env }>();

aiRouter.get("/query", async (c) => {
  const question = c.req.query('text') || "What is the best pizza topping";

  const embeddings = await c.env.AI.run('@cf/baai/bge-base-en-v1.5', { text: question });
  const vectors = embeddings.data[0];

  const vectorQuery = await c.env.VECTOR_INDEX.query(vectors, { topK: 1 });
  let vecId;
  if (vectorQuery.matches && vectorQuery.matches.length > 0 && vectorQuery.matches[0]) {
    vecId = vectorQuery.matches[0].id;
  }

  let notes: string[] = [];
  if (vecId) {
    const query = `SELECT * FROM notes WHERE id = ?`;
    const { results } = await c.env.DB.prepare(query).bind(vecId).all();
    if (results) notes = results.map((vec: any) => vec.text as string);
  }

  const contextMessage = notes.length
    ? `Context:\n${notes.map(note => `- ${note}`).join("\n")}`
    : "";

  const systemPrompt = `When answering the question or responding, use the context provided, if it is provided and relevant.`;

  const { response } = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
    messages: [
      ...(notes.length ? [{ role: 'system', content: contextMessage }] : []),
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question }
    ]
  });

  return c.text(response);
});

aiRouter.post('/notes', async (c) => {
  const { text } = await c.req.json();
  if (!text) return c.text("Missing text", 400);
  await c.env.RAG_WORKFLOW.create({ params: { text } });
  return c.text("Created note", 201);
});
