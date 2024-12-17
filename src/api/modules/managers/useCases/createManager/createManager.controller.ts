import { Request, Response } from "express";
import { CreateManagerService } from "./createManager.service";
import { Manager } from "../../model/Manager";

export class CreateManagerController {
  constructor(private readonly service: CreateManagerService) {}

  async handle(req: Request, res: Response) {
    const { name, email, photo, roleId, birthday, cpf, address, permissions } =
      req.body;

    const manager = await this.service.execute({
      name,
      email,
      photo,
      roleId,
      birthday,
      cpf,
      address,
      permissions,
      actualManager: req.manager as Manager,
    });

    return res.status(201).json({
      email,
      manager,
    });
  }
}
