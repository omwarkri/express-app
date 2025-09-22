const express = require("express");
const app = express();
const PORT = process.env.PORT || 80; // Use 80 for default HTTP, no :3000 in URL

// Middleware to parse JSON
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("🚀 Hello from Express.js which i work , my name is devops!");
});

// Example API route
app.get("/api/data", (req, res) => {
  res.json({
    message: "This is sample API data",
    items: [1, 2, 3, 4],
  });
});

// POST route
app.post("/api/user", (req, res) => {
  const { name, email } = req.body;
  res.json({
    success: true,
    message: `User ${name} with email ${email} added successfully!`,
  });
});

// Start server on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
});
