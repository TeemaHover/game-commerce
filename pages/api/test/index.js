export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      // Example: Log the request body
      console.log(req.body);
      res.status(200).json({ message: "GET request handled successfully" });
    } catch (error) {
      console.error("Error handling GET request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "method not allowed" });
  }
  // Your asynchronous logic for handling GET requests goes here
}
