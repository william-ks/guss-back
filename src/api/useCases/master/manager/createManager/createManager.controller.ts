import { Request, Response } from "express";
import { CreateManagerService } from "./createManager.service";

export class CreateManagerController {
  constructor(private readonly service: CreateManagerService) {}

  async handle(req: Request, res: Response) {
    const { name, email, roleId, birthday, cpf, address, permissions } =
      req.body;

    const { permissions: managerPermissionsRaw } = req.manager;

    const managerPermissions = managerPermissionsRaw.map((el) => {
      return {
        id: el.permission.id,
        name: el.permission.name,
        code: el.permission.code,
      };
    });

    const manager = await this.service.execute({
      name,
      email,
      roleId,
      birthday,
      cpf,
      address,
      permissions,
      managerPermissions,
    });

    return res.status(201).json({
      email,
      manager,
    });
  }
}
