import { NextFunction, Request, Response } from "express";
import { HandleToken } from "../providers/tokens/implementations/handleToken";
import { ManagerRepository } from "../repositories/manager/implementation/ManagerRepository";

export const handleManagerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const handleToken = new HandleToken();
  const managerRepository = new ManagerRepository();

  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.includes("Bearer")) {
      throw new Error();
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new Error();
    }
    const managerId = handleToken.readToken(token, "manager");

    const manager = await managerRepository.findBy({
      key: "public_id",
      value: managerId,
    });

    if (!manager) {
      throw new Error();
    }

    req.manager = manager;

    next();
  } catch (e) {
    console.log(e);

    throw {
      code: 403,
      message: "Por favor faça login para continuar.",
    };
  }
};
