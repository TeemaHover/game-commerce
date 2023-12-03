// pages/api/products.js
import { connectToDatabase } from "../../../../app/mongo";

export default async function handler(req, res) {
  try {
    const { method } = req;

    if (method === "GET") {
      const db = await connectToDatabase();

      // Retrieve products from the database
      const products = await db.collection("products").find({}).toArray();

      return res.status(200).json(products);
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
