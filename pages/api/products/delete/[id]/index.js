import { connectToDatabase } from "../../../../../app/mongo";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "DELETE") {
    return handleDelete(req, res);
  } else {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleDelete(req, res) {
  try {
    const db = await connectToDatabase();
    const { _id } = req.body;

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(_id),
    });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
