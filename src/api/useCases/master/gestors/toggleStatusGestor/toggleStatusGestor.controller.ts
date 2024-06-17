import { Request, Response } from "express";
import { ToggleStatusGestorSerice } from "./toggleStatusGestor.service";

export class ToggleStatusGestorController {
  constructor(private readonly service: ToggleStatusGestorSerice) {}

  async handle(req: Request, res: Response) {
    const { status } = req.body;
    const { id: gestorToToggle } = req.params;

    await this.service.execute({ status, gestorToToggle });

    return res.status(204).end();
  }
}
