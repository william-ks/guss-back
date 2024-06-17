import { Request, Response } from "express";
import { LoginGestorService } from "./loginGestor.service";

export class LoginGestorController {
  constructor(private readonly service: LoginGestorService) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const data = await this.service.execute({ email, password });

    return res.status(200).json(data);
  }
}
