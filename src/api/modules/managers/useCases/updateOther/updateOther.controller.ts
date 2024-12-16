import { Request, Response } from "express";
import { UpdateOtherService } from "./updateOther.service";
import { Manager } from "../../model/Manager";

export class UpdateOtherController {
  constructor(private readonly service: UpdateOtherService) {}

  async handle(req: Request, res: Response) {
    const { roleId, permissions } = req.body;
    const { id: managerPublicId } = req.params;
    const actualManager = req.manager;

    await this.service.execute({
      managerPublicId,
      roleId,
      permissions,
      actualManager: actualManager as Manager,
    });

    return res.status(204).end();
  }
}
