import { Position } from "../../entities/Position";
import { IPositionRepository } from "../IPositionRepository";
import { prisma } from "../../../config/prisma";

export class PositionRepository implements IPositionRepository {
  async find(id: string): Promise<Position> {
    const found = await prisma.position.findFirst({
      where: {
        id,
      },
    });

    return found;
  }
}
