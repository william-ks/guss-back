import { Request, Response } from "express";
import { ToggleStatusGestorSerice } from "./toggleStatusGestor.service";

export class ToggleStatusGestorController {
  constructor(private readonly service: ToggleStatusGestorSerice) {}

  async handle(req: Request, res: Response) {
    const { status } = req.body;
    const { id: gestorToToggleId } = req.params;
    const { id: selfId } = req.gestor;

    await this.service.execute({ status, gestorToToggleId, selfId });

    return res.status(204).end();
  }
}
