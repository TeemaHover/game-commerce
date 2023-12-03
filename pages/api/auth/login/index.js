import { connectToDatabase } from "../../../../app/mongo";

export default async function handler(req, res) {
  // Run the cors middleware before your route handler
  const { method, body } = req;

  if (method === "POST") {
    return POST(req, res, body);
  } else {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function POST(req, res, body) {
  if (!body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  let db;
  try {
    const { username, password } = body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    db = await connectToDatabase();

    if (req.url === "/api/auth/login") {
      // Handle login logic
      const user = await db.collection("users").findOne({ username, password });

      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
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
