import { Request, Response } from "express";
import { ListAllGestorsService } from "./listAllGestors.service";

export class ListAllGestorsController {
  constructor(private service: ListAllGestorsService) {}

  async handle(req: Request, res: Response) {
    const data = await this.service.execute();

    return res.json(data);
  }
}
