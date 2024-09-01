"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI, {
            dbName: "code-compiler",
        });
        console.log("DB Connected");
    }
    catch (err) {
        console.log("Error Establishing Connection", err);
    }
};
exports.default = dbConnect;
