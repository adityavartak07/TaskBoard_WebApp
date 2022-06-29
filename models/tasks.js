import mongoose from "mongoose";
import User from "./users.js";

const taskSchema = mongoose.Schema({
  message: String,
  day: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

var TaskMessage = mongoose.model("TaskMessage", taskSchema);

export default TaskMessage;
