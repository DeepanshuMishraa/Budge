import { Hono } from "hono";
import { Classify } from "../../utils/ai";


export const aiRouter = new Hono();

const mockData = [
  {
    "transaction_id": "TXN123456",
    "user_id": "U1001",
    "date_time": "2024-09-14T10:30:00Z",
    "category": "Groceries",
    "amount": 50.75,
    "payment_method": "Credit Card",
    "merchant_name": "SuperMart",
    "location": "New York, USA",
    "transaction_type": "Offline",
    "impact_factor": {
      "carbon_footprint": 2.5,
      "social_impact": "Low"
    }
  },
  {
    "transaction_id": "TXN123457",
    "user_id": "U1002",
    "date_time": "2024-09-14T12:45:00Z",
    "category": "Entertainment",
    "amount": 15.99,
    "payment_method": "UPI",
    "merchant_name": "Netflix",
    "location": "Los Angeles, USA",
    "transaction_type": "Online",
    "impact_factor": {
      "carbon_footprint": 1.2,
      "social_impact": "Medium"
    }
  },
  {
    "transaction_id": "TXN123458",
    "user_id": "U1003",
    "date_time": "2024-09-14T15:00:00Z",
    "category": "Education",
    "amount": 120.00,
    "payment_method": "Crypto",
    "merchant_name": "Udemy",
    "location": "San Francisco, USA",
    "transaction_type": "Online",
    "impact_factor": {
      "carbon_footprint": 0.8,
      "social_impact": "High"
    }
  },
  {
    "transaction_id": "TXN123459",
    "user_id": "U1004",
    "date_time": "2024-09-14T18:20:00Z",
    "category": "Transport",
    "amount": 25.00,
    "payment_method": "Debit Card",
    "merchant_name": "Uber",
    "location": "Chicago, USA",
    "transaction_type": "Online",
    "impact_factor": {
      "carbon_footprint": 3.7,
      "social_impact": "Medium"
    }
  },
  {
    "transaction_id": "TXN123460",
    "user_id": "U1005",
    "date_time": "2024-09-14T20:10:00Z",
    "category": "Healthcare",
    "amount": 200.50,
    "payment_method": "Credit Card",
    "merchant_name": "Medicare Clinic",
    "location": "Boston, USA",
    "transaction_type": "Offline",
    "impact_factor": {
      "carbon_footprint": 1.5,
      "social_impact": "High"
    }
  }
]


aiRouter.get("/classify", async (c) => {
  try {
    const completion = await Classify(mockData);
    const result = JSON.parse(completion.choices[0].message.content);
    return c.json(result);
  } catch (error) {
    console.error("Classification error:", error);
    return c.json({
      error: "Failed to process classification",
    }, 500);
  }
});
