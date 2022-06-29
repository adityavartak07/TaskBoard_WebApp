import mongoose from "mongoose";
import TaskMessage from "./tasks.js";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskMessage"
    }
  ]
});
var User = mongoose.model("User", userSchema);
export default User;
