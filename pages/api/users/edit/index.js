// userEdit.js
import { connectToDatabase } from "../../../../app/mongo";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "PUT") {
    return handlePut(req, res, body);
  } else {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handlePut(req, res, body) {
  if (!body) {
    return res.status(400).json({ error: "Request body is required" });
  }

  try {
    const db = await connectToDatabase();

    const { username, email, phone, address } = body;

    // Update user details in the database
    const result = await db.collection("users").updateOne(
      { username },
      {
        $set: {
          email,
          phone,
          address, // Add the address field
          // Add other fields as needed
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
