import { Request, Response } from "express";
import { ReadAllRolesService } from "./readAllRoles.service";

export class ReadAllRolesController {
  constructor(private service: ReadAllRolesService) {}

  async handle(req: Request, res: Response) {
    const roles = await this.service.execute();

    return res.status(200).json(roles);
  }
}
