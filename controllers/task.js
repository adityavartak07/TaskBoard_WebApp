import express from "express";
import mongoose from "mongoose";

import TaskMessage from "../models/tasks.js";
import User from "../models/users.js";

const router = express.Router();

export const createTask = async (req, res) => {
  console.log("hello");
  const { Task, Day } = req.body;
  console.log(req.body);
  // findById
  // console.log(task);
  const user = await User.findById(req.userId);

  const newTaskMessage = new TaskMessage({
    message: Task,
    day: Day,
    user: user._id,
    createdAt: new Date().toISOString()
  });

  try {
    user.tasks.push(newTaskMessage);
    user.save();
    await newTaskMessage.save();

    res.status(201).json(newTaskMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const gettasks = async (req, res) => {
  // await User.findById(userid);
  // console.log("here");
  const { id } = req.params;
  console.log(id);

  try {
    const useri = await User.findById(id).populate("tasks");
    console.log("tasks are", useri.tasks);
    res.json(useri.tasks);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  // await User.findById(userid);
  // console.log("here");
  const { id } = req.params;
  console.log(id);

  try {
    // const Task = await TaskMessage.findOneAndRemove({ _id: String(id) });
    // Task.save();
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No task with id: ${id}`);

    await TaskMessage.findByIdAndRemove(id);

    // const user = await User.findByIdAndUpdate(req.userId).populate("tasks");

    // user.tasks = user.tasks.filter((taskid) => {
    //   String(taskid) !== String(id);
    // });
    User.update({ _id: req.userId }, { $pull: { tasks: id } });
    res.json(`Task with id : ${id} deleted successfully`);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
