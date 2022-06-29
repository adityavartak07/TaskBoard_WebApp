import express from "express";
// import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRouter from "./routes/tasks.js";
import userRouter from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/tasks", taskRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING.");
});

const PORT = 4000;

mongoose
  .connect(
    "mongodb+srv://aditya:Aditya07@cluster0.nqpce.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set("useFindAndModify", false);
