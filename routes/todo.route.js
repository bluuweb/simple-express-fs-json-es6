import { todoController } from "../controllers/todo.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import { Router } from "express";

const router = Router();

// Middleware global para todas las rutas
router.use(authMiddleware);

// GET /todos
router.get("/", todoController.read);

// GET /todos/:id
router.get("/:id", todoController.readById);

// POST /todos
router.post("/", todoController.create);

// PUT /todos/:id
router.put("/:id", todoController.update);

// DELETE /todos/:id
router.delete("/:id", todoController.remove);

export default router;
