import express from "express";
import connection from "./Db/db.js";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import userRouter from "./Routes/user.js";
import studentRouter from "./Routes/student.js";

app.get("/", (req, res) => {
  console.log("hello ther");
  return res.status(200).json({
    success:true,
    message:"home route"
  })
});

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/api/v1',userRouter);
app.use('/api/v1',studentRouter);
// databae connected

const port = 8080;
connection
  .connect()
  .then((res) => {
    console.log("database connected");
    app.listen(port, (req, res) => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes

