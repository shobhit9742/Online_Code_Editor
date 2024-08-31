import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRoute";
const app = express();

config();
dbConnect();

app.use(express.json());
app.use(cors());

// Routes
app.use("/compiler", compilerRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
