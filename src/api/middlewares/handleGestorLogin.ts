import { NextFunction, Request, Response } from "express";
import { HandleToken } from "../providers/tokens/implementations/handleToken";
import { GestorRepository } from "../repositories/gestor/implementation/GestorRepository";

export const handleGestorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const handleToken = new HandleToken();
  const gestorRepository = new GestorRepository();

  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.includes("Bearer")) {
      throw new Error();
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new Error();
    }
    const gestorId = handleToken.readToken(token, "gestor");

    const gestor = await gestorRepository.findBy({
      key: "id",
      value: gestorId,
    });

    if (!gestor) {
      throw new Error();
    }

    req.gestor = gestor;

    next();
  } catch (e) {
    console.log(e);

    throw {
      code: 403,
      message: "Por favor faça login para continuar.",
    };
  }
};
