import { Request, Response } from "express";
import { CreateUserService } from "./createUser.service";

export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  async handle(req: Request, res: Response) {
    const { name, email, office } = req.body;

    const user = await this.service.execute({
      name,
      email,
      officeId: office,
    });

    return res.status(201).json({
      email,
      password: user,
    });
  }
}
