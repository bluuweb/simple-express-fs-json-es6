import cors from "cors";
import "dotenv/config";
import express from "express";
import { todoModel } from "./models/todo.model.js";

const app = express();

app.use(express.json());
app.use(cors());

// GET /todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.findAll();
    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /todos/:id
app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await todoModel.findById(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /todos
app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTodo = {
    title,
    done: false,
  };
  try {
    const todo = await todoModel.create(newTodo);
    return res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /todos/:id
app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await todoModel.update(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /todos/:id
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await todoModel.remove(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json({ message: "Todo deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
