import { Request, Response } from "express";
import { UpdateSelfManagerService } from "./updateSelfManager.service";

export class UpdateSelfManagerController {
  constructor(private readonly service: UpdateSelfManagerService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.manager;
    const { name, email, photo, birthday, cpf } = req.body;

    await this.service.execute({
      id,
      name,
      photo,
      email,
      birthday,
      cpf,
    });

    return res.status(204).end();
  }
}
