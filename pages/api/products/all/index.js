// pages/api/products/all.js
import { connectToDatabase } from "../../../../app/mongo";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    return handleGet(req, res);
  } else {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGet(req, res) {
  try {
    const db = await connectToDatabase();

    // Fetch all products from the database
    const products = await db.collection("products").find({}).toArray();

    return res.status(200).json(products);
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
