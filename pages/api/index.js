export default async function handler(req, res) {
  const { method } = req;
  console.log("method:", method);
  if (method === "GET") {
    res.status(200).json({ message: "correct" });
  }
}
