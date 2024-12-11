import { Request, Response } from "express";
import { Manager } from "../../../../entities/Manager";
import { UpdateOtherService } from "./updateOther.service";

export class UpdateOtherController {
  constructor(private readonly service: UpdateOtherService) {}

  async handle(req: Request, res: Response) {
    const { name, roleId, email, photo, birthday, cpf, permissions } = req.body;
    const { id: managerPublicId } = req.params;
    const actualManager = req.manager;

    await this.service.execute({
      managerPublicId,
      name,
      roleId,
      email,
      photo,
      birthday,
      cpf,
      permissions,
      actualManager: actualManager as Manager,
    });

    return res.status(204).end();
  }
}
