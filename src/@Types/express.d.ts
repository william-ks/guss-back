import { Gestor } from "../api/entities/gestor";

declare global {
  namespace Express {
    export interface Request {
      gestor?: Partial<Gestor>;
      // gestor?: Partial<Gestor>;
    }
  }
}
