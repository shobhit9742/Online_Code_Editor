import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRoute";
import { userRouter } from "./routes/userRoute";
const app = express();

config();
dbConnect();

app.use(express.json());
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:5173", process.env.CLIENT_URL!],
//   })
// );
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Routes
app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
