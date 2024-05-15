import { Request, Response } from "express";
import { ReadSelfService } from "./readSelf.service";

export class ReadSelfController {
  constructor(private readonly service: ReadSelfService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.user;

    const user = await this.service.execute({ id });

    return res.status(200).json(user);
  }
}
