const express = require("express");
const app = express();

// Test route registration
app.use(express.json());

// Simulate the route structure
app.post("/api/peserta/:id/action", (req, res) => {
  console.log("Route /:id/action hit!");
  console.log("ID:", req.params.id);
  console.log("Body:", req.body);

  res.json({
    success: true,
    message: "Route action berfungsi!",
    data: { id: req.params.id, action: req.body.action },
  });
});

// This would catch /:id first if not careful
app.get("/api/peserta/:id", (req, res) => {
  console.log("Route /:id hit!");
  res.json({ message: "This is the :id route" });
});

// Test the routes
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(
    'Test with: curl -X POST http://localhost:5001/api/peserta/123/action -H "Content-Type: application/json" -d \'{"action":"Lolos"}\''
  );
});
