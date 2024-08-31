// import { Request, Response } from "express";
// import { fullCodeType } from "../types/compilerTypes";
// import { AuthRequest } from "../middlewares/verifyToken";
// import { User } from "../models/User";
// import { Code } from "../models/Code";

// export const saveCode = async (req: AuthRequest, res: Response) => {
//   const { fullCode, title }: { fullCode: fullCodeType; title: string } =
//     req.body;
//   let ownerName = "Anonymous";
//   let user = undefined;
//   let ownerInfo = undefined;
//   let isAuthenticated = false;

//   if (req._id) {
//     user = await User.findById(req._id);
//     if (!user) {
//       return res.status(404).send({ message: "User not found!" });
//     }
//     ownerName = user?.username;
//     ownerInfo = user._id;
//     isAuthenticated = true;
//   }

//   if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
//     return res.status(400).send({ message: "Code cannot be blank!" });
//   }
//   try {
//     const newCode = await Code.create({
//       fullCode: fullCode,
//       ownerName: ownerName,
//       ownerInfo: ownerInfo,
//       title: title,
//     });
//     if (isAuthenticated && user) {
//       user.savedCodes.push(newCode._id);
//       await user.save();
//     }
//     return res.status(201).send({ url: newCode._id, status: "saved!" });
//   } catch (error) {
//     return res.status(500).send({ message: "Error saving code", error });
//   }
// };

// export const loadCode = async (req: AuthRequest, res: Response) => {
//   const { urlId } = req.body;
//   const userId = req._id;
//   let isOwner = false;
//   try {
//     const existingCode = await Code.findById(urlId);
//     if (!existingCode) {
//       return res.status(404).send({ message: "Code not found" });
//     }
//     const user = await User.findById(userId);
//     if (user?.username === existingCode.ownerName) {
//       isOwner = true;
//     }
//     return res.status(200).send({ fullCode: existingCode.fullCode, isOwner });
//   } catch (error) {
//     return res.status(500).send({ message: "Error loading code", error });
//   }
// };

// export const getMyCodes = async (req: AuthRequest, res: Response) => {
//   const userId = req._id;
//   try {
//     const user = await User.findById(userId).populate({
//       path: "savedCodes",
//       options: { sort: { createdAt: -1 } },
//     });

//     if (!user) {
//       return res.status(404).send({ message: "Cannot find User!" });
//     }
//     return res.status(200).send(user.savedCodes);
//   } catch (error) {
//     return res.status(500).send({ message: "Error loading my codes!", error });
//   }
// };

// export const deleteCode = async (req: AuthRequest, res: Response) => {
//   const userId = req._id;
//   const { id } = req.params;
//   try {
//     const owner = await User.findById(userId);
//     if (!owner) {
//       return res
//         .status(404)
//         .send({ message: "Cannot find the owner profile!" });
//     }
//     const existingCode = await Code.findById(id);
//     if (!existingCode) {
//       return res.status(404).send({ message: "Code not found" });
//     }
//     if (existingCode.ownerName !== owner.username) {
//       return res
//         .status(400)
//         .send({ message: "You don't have permission to delete this code!" });
//     }
//     const deleteCode = await Code.findByIdAndDelete(id);
//     if (deleteCode) {
//       return res.status(200).send({ message: "Code Deleted successfully!" });
//     } else {
//       return res.status(404).send({ message: "Code not found" });
//     }
//   } catch (error) {
//     return res.status(500).send({ message: "Error deleting code!", error });
//   }
// };

// export const editCode = async (req: AuthRequest, res: Response) => {
//   const userId = req._id;
//   const postId = req.params.id;
//   const fullCode = req.body;
//   try {
//     const owner = await User.findById(userId);
//     if (!owner) {
//       return res.status(404).send({ message: "cannot find owner!" });
//     }
//     const existingPost = await Code.findById(postId);
//     if (!existingPost) {
//       return res.status(404).send({ message: "Cannot find post to edit!" });
//     }
//     if (existingPost.ownerName !== owner.username) {
//       return res
//         .status(400)
//         .send({ message: "You don't have permission to edit this post!" });
//     }
//     await Code.findByIdAndUpdate(postId, {
//       fullCode: fullCode,
//     });
//     return res.status(200).send({ message: "Post updated successfully" });
//   } catch (error) {
//     return res.status(500).send({ message: "Error editing code!", error });
//   }
// };

// export const getAllCodes = async (req: Request, res: Response) => {
//   try {
//     const allCodes = await Code.find().sort({ createdAt: -1 });
//     return res.status(200).send(allCodes);
//   } catch (error) {
//     return res.status(500).send({ message: "Error editing code!", error });
//   }
// };

import { Request, Response } from "express";
import { fullCodeType } from "../types/compilerTypes";
import { AuthRequest } from "../middlewares/verifyToken";
import { User } from "../models/User";
import { Code } from "../models/Code";

// Helper function to standardize responses
const sendResponse = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data?: any
) => {
  return res.status(status).send({ success, message, data });
};

export const saveCode = async (req: AuthRequest, res: Response) => {
  const { fullCode, title }: { fullCode: fullCodeType; title: string } =
    req.body;

  if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
    return sendResponse(res, 400, false, "Code cannot be blank!");
  }

  let ownerName = "Anonymous";
  let ownerInfo;
  let isAuthenticated = false;

  try {
    if (req._id) {
      const user = await User.findById(req._id);
      if (!user) {
        return sendResponse(res, 404, false, "User not found!");
      }
      ownerName = user.username;
      ownerInfo = user._id;
      isAuthenticated = true;
    }

    const newCode = await Code.create({
      fullCode,
      ownerName,
      ownerInfo,
      title,
    });

    if (isAuthenticated && ownerInfo) {
      await User.findByIdAndUpdate(ownerInfo, {
        $push: { savedCodes: newCode._id },
      });
    }

    return sendResponse(res, 201, true, "Code saved successfully!", {
      url: newCode._id,
    });
  } catch (error) {
    return sendResponse(res, 500, false, "Error saving code", error);
  }
};

export const loadCode = async (req: AuthRequest, res: Response) => {
  const { urlId } = req.body;
  const userId = req._id;
  let isOwner = false;

  try {
    const existingCode = await Code.findById(urlId);
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
  } catch (error) {
    return sendResponse(res, 500, false, "Error loading code", error);
  }
};

export const getMyCodes = async (req: AuthRequest, res: Response) => {
  const userId = req._id;

  try {
    const user = await User.findById(userId).populate({
      path: "savedCodes",
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return sendResponse(res, 404, false, "Cannot find user!");
    }

    return sendResponse(
      res,
      200,
      true,
      "My codes loaded successfully",
      user.savedCodes
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Error loading my codes", error);
  }
};

export const deleteCode = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  const { id } = req.params;

  try {
    const owner = await User.findById(userId);
    if (!owner) {
      return sendResponse(res, 404, false, "Cannot find the owner profile!");
    }

    const existingCode = await Code.findById(id);
    if (!existingCode) {
      return sendResponse(res, 404, false, "Code not found");
    }

    if (existingCode.ownerInfo?.toString() !== owner._id.toString()) {
      return sendResponse(
        res,
        403,
        false,
        "You don't have permission to delete this code!"
      );
    }

    await Code.findByIdAndDelete(id);
    return sendResponse(res, 200, true, "Code deleted successfully!");
  } catch (error) {
    return sendResponse(res, 500, false, "Error deleting code", error);
  }
};

export const editCode = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  const postId = req.params.id;
  const fullCode: fullCodeType = req.body;

  try {
    const owner = await User.findById(userId);
    if (!owner) {
      return sendResponse(res, 404, false, "Cannot find owner!");
    }

    const existingPost = await Code.findById(postId);
    if (!existingPost) {
      return sendResponse(res, 404, false, "Cannot find post to edit!");
    }

    if (existingPost.ownerInfo?.toString() !== owner._id.toString()) {
      return sendResponse(
        res,
        403,
        false,
        "You don't have permission to edit this post!"
      );
    }

    await Code.findByIdAndUpdate(postId, { fullCode });
    return sendResponse(res, 200, true, "Post updated successfully");
  } catch (error) {
    return sendResponse(res, 500, false, "Error editing code", error);
  }
};

export const getAllCodes = async (req: Request, res: Response) => {
  try {
    const allCodes = await Code.find().sort({ createdAt: -1 });
    return sendResponse(
      res,
      200,
      true,
      "All codes loaded successfully",
      allCodes
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Error loading codes", error);
  }
};
