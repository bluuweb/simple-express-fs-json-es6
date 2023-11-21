import { getDatabaseError } from "../lib/errors/database.error.js";
import { todoModel } from "../models/todo.model.js";

const read = async (req, res) => {
  try {
    const todos = await todoModel.findAll();
    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const readById = async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await todoModel.findById(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    console.log(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const create = async (req, res) => {
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
    return res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const update = async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await todoModel.update(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json(todo);
  } catch (error) {
    console.log(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await todoModel.remove(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json({ message: "Todo deleted" });
  } catch (error) {
    console.log(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const todoController = {
  read,
  readById,
  create,
  update,
  remove,
};