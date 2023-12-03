// Import necessary modules and functions
import { connectToDatabase } from "../../../../app/mongo";

// Main handler function
export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "POST") {
    return handlePost(req, res, body);
  } else {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// Handler function for POST requests
async function handlePost(req, res, body) {
  if (!body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  let db;
  try {
    db = await connectToDatabase();

    if (req.url === "/api/orders/create") {
      // Handle order creation logic
      const { cartItems, username } = body; // Extract username from the request body

      // Check if the user is logged in (you can enhance this check based on your authentication logic)
      if (!username) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Save the order details to the database
      await db.collection("orders").insertOne({
        username,
        cartItems,
        orderDate: new Date(),
      });

      return res.status(200).json({ message: "Order placed successfully" });
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
