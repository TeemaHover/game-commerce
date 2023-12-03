// In your API route for fetching all user details (/api/users/all for example)

import { connectToDatabase } from "../../../../app/mongo";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    return handleGetAll(req, res);
  } else {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGetAll(req, res) {
  try {
    const db = await connectToDatabase();

    // Fetch all user details from the database
    const users = await db.collection("users").find().toArray();

    // If no users are found, return a 404 status with an error message
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    // If users are found, return a 200 status with the array of user details
    const usersDetails = users.map((user) => ({
      username: user.username,
      email: user.email,
      address: user.address,
      image: user.image,
      phone: user.phone,
    }));

    return res.status(200).json(usersDetails);
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
