import { Request, Response } from "express";
import { ReadAllPermissionService } from "./readAllPermissions.service";

export class ReadAllPermissionsController {
  constructor(private service: ReadAllPermissionService) {}

  async handle(req: Request, res: Response) {
    const permissions = await this.service.execute();

    return res.status(200).json(permissions);
  }
}
