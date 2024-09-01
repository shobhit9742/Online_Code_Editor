"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const dbConnect_1 = __importDefault(require("./lib/dbConnect"));
const compilerRoute_1 = require("./routes/compilerRoute");
const userRoute_1 = require("./routes/userRoute");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
(0, dbConnect_1.default)();
app.use(express_1.default.json());
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:5173", process.env.CLIENT_URL!],
//   })
// );
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
// Routes
app.use("/compiler", compilerRoute_1.compilerRouter);
app.use("/user", userRoute_1.userRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
