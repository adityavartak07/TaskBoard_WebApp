import express from "express";

import { createTask, gettasks, deleteTask } from "../controllers/task.js";
import auth from "../middlewares/auth.js";
const router = express.Router();
// import auth from "../middleware/auth.js";

router.get("/:id", gettasks);

router.post("/", auth, createTask);
// router.patch('/:id', updateBook);
router.delete("/:id", auth, deleteTask);

export default router;
