import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js"
import blogRouter from "./routes/blog.js";


const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json())

app.use("/users",userRouter);// http://localhost:5000/users/signup
app.use("/blog", blogRouter);

const port = 5000
//mongodb_url
const MONGODB_URL = "mongodb+srv://sawda123hoq:YipUryDAXBdidTDR@cluster0.n2nlv.mongodb.net/blog_db?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));






























