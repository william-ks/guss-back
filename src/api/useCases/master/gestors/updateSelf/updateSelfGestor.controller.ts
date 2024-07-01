import { Request, Response } from "express";
import { UpdateSelfGestorService } from "./updateSelfGestor.service";

export class UpdateSelfGestorController {
  constructor(private readonly service: UpdateSelfGestorService) {}

  async handle(req: Request, res: Response) {
    const { id } = req.gestor;
    const { name, email, birthDate, cpf, address } = req.body;

    await this.service.execute({ id, name, email, birthDate, cpf, address });

    return res.status(204).end();
  }
}
