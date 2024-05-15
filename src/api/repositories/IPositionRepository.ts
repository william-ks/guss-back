import { Position } from "../entities/Position";

export interface IPositionRepository {
  find(id: string): Promise<Position | undefined>;
}
