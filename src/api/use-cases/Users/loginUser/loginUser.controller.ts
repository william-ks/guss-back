import { Request, Response } from "express";
import { LoginUserService } from "./loginUser.service";

export class LoginUserController {
  constructor(private readonly service: LoginUserService) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    await this.service.execute({ email, password });

    return res.status(200);
  }
}
