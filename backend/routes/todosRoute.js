import express from "express";
import { Todo } from "../models/todoModel.js";

const router = express.Router();
// Route for saving a new todo
router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({ message: "Required title" });
    }
    const newTodo = {
      title: req.body.title,
      isCompleted: false,
    };
    const todo = await Todo.create(newTodo);
    return res.status(201).send(todo);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for getiing all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});

    return res.status(200).json({ total: todos.length, data: todos });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for getiing 1 todo by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    return res.status(200).json(todo);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for update todo by id
router.patch("/:id", async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({ message: "Required title" });
    }

    const { id } = req.params;
    const result = await Todo.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Not found todo" });
    }
    return res.status(200).send({ message: "Todo updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for complete todo by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    const result = await Todo.findOneAndUpdate(
      { _id: id }, // Use an object to define the filter based on the ID
      { isCompleted: isCompleted }, // Update the field you want to modify
      { new: true } // Set `new` to true to return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for delete todo by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Not found todo" });
    }
    return res.status(200).send({ message: "Deleted todo successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for delete all todo
router.delete("/", async (req, res) => {
  try {
    const result = await Todo.deleteMany();

    if (!result) {
      return res.status(404).json({ message: "Not found todo" });
    }
    return res.status(200).send({ message: "Deleted all todo successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
