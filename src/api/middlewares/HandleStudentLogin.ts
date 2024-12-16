import { NextFunction, Request, Response } from "express";
import { StudentRepository } from "../modules/students/repository/implementation/prisma/StudentRepository";
import { HandleToken } from "../providers/tokens/implementations/handleToken";

export const handleStudentLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const handleToken = new HandleToken();
  const studentRepository = new StudentRepository();

  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.includes("Bearer")) {
      throw new Error();
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new Error();
    }
    const studentId = handleToken.readToken(token, "student");

    const student = await studentRepository.findBy({
      key: "publicId",
      value: studentId,
    });

    if (!student) {
      throw new Error();
    }

    req.student = student;

    next();
  } catch (e) {
    console.log(e);

    throw {
      code: 403,
      message: "Por favor faça login para continuar.",
    };
  }
};
