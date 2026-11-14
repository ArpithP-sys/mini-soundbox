
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// Temporary animal data

const animals = [
  { id: 1, name: "Dog", emoji: "🐶", sound: "Woof Woof!", category: "Pet" },
  { id: 2, name: "Cat", emoji: "🐱", sound: "Meow Meow!", category: "Pet" },
  { id: 3, name: "Cow", emoji: "🐮", sound: "Moooo!", category: "Farm" },
  { id: 4, name: "Lion", emoji: "🦁", sound: "Roarrr!", category: "Wild" },
  { id: 5, name: "Bird", emoji: "🐦", sound: "Tweet Tweet!", category: "Pet" },
  { id: 6, name: "Duck", emoji: "🦆", sound: "Quack Quack!", category: "Farm" },
  { id: 7, name: "Monkey", emoji: "🐵", sound: "Ooh Ooh!", category: "Wild" },
  { id: 8, name: "Elephant", emoji: "🐘", sound: "Trumpet!", category: "Wild" }
];
// Home route
app.get("/", (req, res) => {
  res.send("Mini SoundBox Backend is running!");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Backend server is healthy"
  });
});

// Get all animals
app.get("/api/animals", (req, res) => {
  res.json({
    success: true,
    count: animals.length,
    data: animals
  });
});

// Get animal by ID
app.get("/api/animals/:id", (req, res) => {
  const animal = animals.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!animal) {
    return res.status(404).json({
      success: false,
      message: "Animal not found"
    });
  }

  res.json({
    success: true,
    data: animal
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
