import { Request, Response } from "express";
import { ReadOtherManagerService } from "./readOther.Service";

export class ReadOtherManagerController {
  constructor(private readonly service: ReadOtherManagerService) {}

  async handle(req: Request, res: Response) {
    const { id: wantedId } = req.params;

    const gestor = await this.service.execute({
      wantedId,
    });

    return res.status(200).json(gestor);
  }
}
