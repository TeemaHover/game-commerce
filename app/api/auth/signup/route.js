// pages/api/auth.js

import { connectToDatabase } from "../../../mongo";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      return handlePostRequest(req, res, body);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handlePostRequest(req, res, body) {
  const { username, password, confirmPassword } = body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const db = await connectToDatabase();

    if (req.url === "/api/auth/signup") {
      // Handle signup logic
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      // Check if the username already exists
      const existingUser = await db.collection("users").findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username is already taken" });
      }

      // Create a new user and insert into the database
      const newUser = {
        username,
        password, // NOTE: In a real application, you should hash the password before storing it
      };

      await db.collection("users").insertOne(newUser);

      return res.status(200).json({ message: "Signup successful" });
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
