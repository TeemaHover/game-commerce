// pages/api/products.js
import { connectToDatabase } from "../../../../app/mongo";

export default async function handler(req, res) {
  let db;

  try {
    const { method } = req;

    if (method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    db = await connectToDatabase();

    
    const products = await db.collection("products").find({}).toArray();

    return res.status(200).json(products);
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
