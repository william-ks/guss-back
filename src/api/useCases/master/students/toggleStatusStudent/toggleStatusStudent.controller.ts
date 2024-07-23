import { Request, Response } from "express";

export class ToggleStatusStudentController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const { status } = req.body;
    const { id: studentToToggleId } = req.params;
    const { id: selfId } = req.gestor;

    await this.service.execute({ status, gestorToToggleId, selfId });

    return res.status(204).end();
  }
}
