import { connectToDatabase } from "../../../../app/mongo";

export default async function handler(req, res) {
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
    const { username, password, confirmPassword, email, phone, address } = body;

    if (!username || !password || !email || !phone || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    db = await connectToDatabase();

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
        email,
        phone,
        address,
      };

      await db.collection("users").insertOne(newUser);

      return res.status(200).json({ message: "Signup successful" });
    } else if (req.url === "/api/auth/login") {
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
