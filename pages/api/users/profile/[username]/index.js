// In your API route for fetching user details (/api/users/profile for example)

import { connectToDatabase } from "../../../../../app/mongo";

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
  return handleGet(req, res);
}

async function handleGet(req, res) {
  let db;
  try {
    db = await connectToDatabase();

    const username  = req.query.username;

    // Fetch user details from the database
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      username: user.username,
      email: user.email,
      address: user.address,
      image: user.image,
      phone: user.phone,
    });
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
