import { Request, Response } from "express";
import { ListAllManagerService } from "./listAllManagers.service";

export class ListAllManagerController {
  constructor(private service: ListAllManagerService) {}

  async handle(req: Request, res: Response) {
    const data = await this.service.execute();

    return res.json(data);
  }
}
