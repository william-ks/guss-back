import { Request, Response } from "express";
import { ReadSelfGestorService } from "./readSelfGestor.service";

export class ReadSelfGestorController {
  constructor(private readonly service: ReadSelfGestorService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.gestor;

    const user = await this.service.execute({ id });

    return res.status(200).json(user);
  }
}
