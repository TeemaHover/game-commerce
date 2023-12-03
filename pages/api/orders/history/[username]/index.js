// Import necessary modules and functions
import { connectToDatabase } from "../../../../../app/mongo";

// Main handler function
export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    return handleGet(req, res);
  } else {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGet(req, res) {
  let db;
  try {
    db = await connectToDatabase();

    const username = req.query.username;

    // Check if username is provided
    if (!username) {
      return res.status(400).json({ error: "Username is required in the URL" });
    }

    const orderHistory = await db
      .collection("orders")
      .find({ username })
      .toArray();

    return res.status(200).json(orderHistory);
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection in the 'finally' block
    if (db) {
      await db.client.close();
    }
  }
}
