// pages/api/products/add.js
import { connectToDatabase } from "../../../../app/mongo";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, description, price } = req.body;

      if (!name || !description || !price) {
        return res
          .status(400)
          .json({ error: "Name, description, and price are required" });
      }

      const db = await connectToDatabase();

      // Add the product to the database
      const newProduct = {
        name,
        description,
        price,
      };

      const result = await db.collection("products").insertOne(newProduct);

      return res.status(200).json({
        message: "Product added successfully",
        productId: result.insertedId,
      });
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
