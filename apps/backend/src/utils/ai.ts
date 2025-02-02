import OpenAI from "openai";


interface Transaction {
  transaction_id: string;
  user_id: string;
  date_time: string;
  category: string;
  amount: number;
  payment_method: string;
  merchant_name: string;
  location: string;
  transaction_type: string;
  impact_factor: {
    carbon_footprint: number;
    social_impact: string;
  };
}

const client = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEMPROMPT = `You are an advanced financial impact classifier AI. Your task is to analyze the provided transaction data and classify its impact on the user's expenses and budget. 

For each transaction, determine:
- The financial strain it imposes.
- Its effect on overall spending habits.
- Potential savings or financial risks.
- An impact score between 0 (no impact) to 1 (high impact).

Return the results in structured JSON format.`;


export async function Classify(data: Transaction[]): Promise<any> {
  return client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: SYSTEMPROMPT,
      },
      {
        role: "user",
        content: `Analyze these transactions: ${JSON.stringify(data)}`
      }
    ],
    model: "llama3-70b-8192",
    response_format: { type: "json_object" },
    temperature: 0.2
  });
}


export async function Chat(query: string) {
  const response = await client.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content: "You are an AI assistant helping a user with their financial transactions.",
      },
      {
        role: "user",
        content: query
      }
    ]
  });

  return response.choices[0].message.content;
}
