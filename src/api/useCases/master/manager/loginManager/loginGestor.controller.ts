import { Request, Response } from "express";
import { LoginManagerService } from "./loginGestor.service";

export class LoginManagerController {
  constructor(private readonly service: LoginManagerService) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const data = await this.service.execute({ email, password });

    return res.status(200).json(data);
  }
}
