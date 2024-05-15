import { Request, Response } from "express";
import { ReadOtherService } from "./readOther.Service";

export class ReadOtherController {
  constructor(private readonly service: ReadOtherService) {}

  async handle(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { id: wantedId } = req.params;

    const user = await this.service.execute({
      userId,
      wantedId,
    });

    return res.status(200).json(user);
  }
}
