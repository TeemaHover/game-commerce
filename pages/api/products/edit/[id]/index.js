import { connectToDatabase } from "../../../../../app/mongo";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "PUT") {
    return handlePut(req, res);
  } else {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handlePut(req, res) {
  try {
    const db = await connectToDatabase();

    const { _id, name, price, year, category, description, image } = req.body;
    console.log(_id, name);

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          name,
          price,
          year,
          category,
          description,
          image,
        },
      }
    );
    console.log("result: ", result);
    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: "Product updated successfully" });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
