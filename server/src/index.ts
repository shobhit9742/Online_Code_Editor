import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
