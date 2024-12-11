import { Request, Response } from "express";
import { ToggleStatusManagerService } from "./toggleStatusManager.service";

export class ToggleStatusManagerController {
  constructor(private readonly service: ToggleStatusManagerService) {}

  async handle(req: Request, res: Response) {
    const { status } = req.body;
    const { id: managerToToggleId } = req.params;
    const { id: selfId } = req.manager;

    await this.service.execute({ status, managerToToggleId, selfId });

    return res.status(204).end();
  }
}
