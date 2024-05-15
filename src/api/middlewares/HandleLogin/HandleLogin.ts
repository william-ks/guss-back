import { NextFunction, Request, Response } from "express";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IHandleToken } from "../../providers/IHandleToken";

export class HandleLogin {
  constructor(
    private userRepository: IUserRepository,
    private handleToken: IHandleToken,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    try {
      if (!authorization || !authorization.includes("Bearer")) {
        throw new Error();
      }

      const token = authorization.split(" ")[1];

      if (!token) {
        throw new Error();
      }
      const userId = this.handleToken.readToken(token);

      const user = await this.userRepository.findBy({
        key: "id",
        value: userId,
      });

      if (!user) {
        throw new Error();
      }

      req.user = user;

      next();
    } catch (e) {
      throw {
        code: 403,
        message: "Por favor faça login para continuar.",
      };
    }
  }
}
