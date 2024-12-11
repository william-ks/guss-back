import { Request, Response } from "express";
import { ReadSelfManagerService } from "./readSelfManager.service";

export class ReadSelfManagerController {
  constructor(private readonly service: ReadSelfManagerService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.manager;

    const user = await this.service.execute({ id });

    return res.status(200).json(user);
  }
}
