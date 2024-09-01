"use strict";
// import { Request, Response } from "express";
// import { fullCodeType } from "../types/compilerTypes";
// import { AuthRequest } from "../middlewares/verifyToken";
// import { User } from "../models/User";
// import { Code } from "../models/Code";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCodes = exports.editCode = exports.deleteCode = exports.getMyCodes = exports.loadCode = exports.saveCode = void 0;
const User_1 = require("../models/User");
const Code_1 = require("../models/Code");
// Helper function to standardize responses
const sendResponse = (res, status, success, message, data) => {
    return res.status(status).send({ success, message, data });
};
const saveCode = async (req, res) => {
    const { fullCode, title } = req.body;
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
        return sendResponse(res, 400, false, "Code cannot be blank!");
    }
    let ownerName = "Anonymous";
    let ownerInfo;
    let isAuthenticated = false;
    try {
        if (req._id) {
            const user = await User_1.User.findById(req._id);
            if (!user) {
                return sendResponse(res, 404, false, "User not found!");
            }
            ownerName = user.username;
            ownerInfo = user._id;
            isAuthenticated = true;
        }
        const newCode = await Code_1.Code.create({
            fullCode,
            ownerName,
            ownerInfo,
            title,
        });
        if (isAuthenticated && ownerInfo) {
            await User_1.User.findByIdAndUpdate(ownerInfo, {
                $push: { savedCodes: newCode._id },
            });
        }
        return sendResponse(res, 201, true, "Code saved successfully!", {
            url: newCode._id,
        });
    }
    catch (error) {
        return sendResponse(res, 500, false, "Error saving code", error);
    }
};
exports.saveCode = saveCode;
const loadCode = async (req, res) => {
    const { urlId } = req.body;
    const userId = req._id;
    let isOwner = false;
    try {
        const existingCode = await Code_1.Code.findById(urlId);
        if (!existingCode) {
            return sendResponse(res, 404, false, "Code not found");
        }
        if (userId && existingCode.ownerInfo?.toString() === userId.toString()) {
            isOwner = true;
        }
        return sendResponse(res, 200, true, "Code loaded successfully", {
            fullCode: existingCode.fullCode,
            isOwner,
        });
    }
    catch (error) {
        return sendResponse(res, 500, false, "Error loading code", error);
    }
};
exports.loadCode = loadCode;
const getMyCodes = async (req, res) => {
    const userId = req._id;
    try {
        const user = await User_1.User.findById(userId).populate({
            path: "savedCodes",
            options: { sort: { createdAt: -1 } },
        });
        if (!user) {
            return sendResponse(res, 404, false, "Cannot find user!");
        }
        return sendResponse(res, 200, true, "My codes loaded successfully", user.savedCodes);
    }
    catch (error) {
        return sendResponse(res, 500, false, "Error loading my codes", error);
    }
};
exports.getMyCodes = getMyCodes;
const deleteCode = async (req, res) => {
    const userId = req._id;
    const { id } = req.params;
    try {
        const owner = await User_1.User.findById(userId);
        if (!owner) {
            return sendResponse(res, 404, false, "Cannot find the owner profile!");
        }
        const existingCode = await Code_1.Code.findById(id);
        if (!existingCode) {
            return sendResponse(res, 404, false, "Code not found");
        }
        if (existingCode.ownerInfo?.toString() !== owner._id.toString()) {
            return sendResponse(res, 403, false, "You don't have permission to delete this code!");
        }
        await Code_1.Code.findByIdAndDelete(id);
        return sendResponse(res, 200, true, "Code deleted successfully!");
    }
    catch (error) {
        return sendResponse(res, 500, false, "Error deleting code", error);
    }
};
exports.deleteCode = deleteCode;
const editCode = async (req, res) => {
    const userId = req._id;
    const postId = req.params.id;
    const fullCode = req.body;
    try {
        const owner = await User_1.User.findById(userId);
        if (!owner) {
            return sendResponse(res, 404, false, "Cannot find owner!");
        }
        const existingPost = await Code_1.Code.findById(postId);
        if (!existingPost) {
            return sendResponse(res, 404, false, "Cannot find post to edit!");
        }
        if (existingPost.ownerInfo?.toString() !== owner._id.toString()) {
            return sendResponse(res, 403, false, "You don't have permission to edit this post!");
        }
        await Code_1.Code.findByIdAndUpdate(postId, { fullCode });
        return sendResponse(res, 200, true, "Post updated successfully");
    }
    catch (error) {
        return sendResponse(res, 500, false, "Error editing code", error);
    }
};
exports.editCode = editCode;
const getAllCodes = async (req, res) => {
    try {
        const allCodes = await Code_1.Code.find().sort({ createdAt: -1 });
        return sendResponse(res, 200, true, "All codes loaded successfully", allCodes);
    }
    catch (error) {
        return sendResponse(res, 500, false, "Error loading codes", error);
    }
};
exports.getAllCodes = getAllCodes;
