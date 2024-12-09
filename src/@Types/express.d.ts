import { Manager } from "../api/entities/Manager";

declare global {
  namespace Express {
    export interface Request {
      manager?: Partial<Manager>;
    }
  }
}
