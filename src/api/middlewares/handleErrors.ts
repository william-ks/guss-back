import { NextFunction, Request, Response } from "express";

interface IError {
  message: string;
  code?: number;
}

export const handleErrors = async (
  error: Error,
  req: Request,
  res: Response,
  NextFunction: NextFunction,
) => {
  const { message, code }: IError = error;

  // remove console.log to production
  console.log("\x1b[31m%s\x1b[0m", error);

  return res.status(code || 500).json({
    status: "error",
    message: message || "Unexpected server error.",
  });
};
