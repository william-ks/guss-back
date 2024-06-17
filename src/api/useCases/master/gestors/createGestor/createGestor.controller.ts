import { Request, Response } from "express";
import { CreateGestorService } from "./createGestor.service";

export class CreateGestorController {
  constructor(private readonly service: CreateGestorService) {}

  async handle(req: Request, res: Response) {
    const { name, email, officeId } = req.body;

    const gestor = await this.service.execute({
      name,
      email,
      officeId,
    });

    return res.status(201).json({
      email,
      gestor,
    });
  }
}
