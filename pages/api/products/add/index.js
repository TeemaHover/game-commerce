import { connectToDatabase } from "../../../../app/mongo";

export default async function handler(req, res) {
  let db;
  try {
    if (req.method === "POST") {
      const { name, description, price, year, category, image } = req.body;

      if (!name || !description || !price || !year || !category || !image) {
        return res.status(400).json({
          error:
            "Name, description, price, year, category, and image are required",
        });
      }

      db = await connectToDatabase();

      // You can directly use the provided image URL
      const newProduct = {
        name,
        description,
        price,
        year,
        category,
        image, // Assuming 'image' is the URL provided by the user
      };

      const result = await db.collection("products").insertOne(newProduct);

      return res.status(200).json({
        message: "Product added successfully",
        productId: result.insertedId,
      });
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
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
