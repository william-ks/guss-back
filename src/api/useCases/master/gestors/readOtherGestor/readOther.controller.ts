import { Request, Response } from "express";
import { ReadOtherGestorService } from "./readOther.Service";

export class ReadOtherGestorController {
  constructor(private readonly service: ReadOtherGestorService) {}

  async handle(req: Request, res: Response) {
    const { id: wantedId } = req.params;

    const gestor = await this.service.execute({
      wantedId,
    });

    return res.status(200).json(gestor);
  }
}
