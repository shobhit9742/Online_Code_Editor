import Code from "../models/Code";
import { Request, Response } from "express";
export const saveCode = async (req: Request, res: Response) => {
  const { fullCode } = req.body;

  try {
    const newCode = await Code.create({
      fullCode: fullCode,
    });
    return res.status(201).send(newCode);
  } catch (error) {
    return res.status(500).send({ message: "Error saving the code", error });
  }
};

export const loadCode = async (req: Request, res: Response) => {
  const { urlid } = req.body;
  try {
    const existingCode = await Code.findById({ urlid });
    if (!existingCode) {
      return res.status(404).send({ message: "Code not found" });
    } else {
      return res.status(200).send({ fullCode: existingCode.fullCode });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error saving the code", error });
  }
};
