import { User } from "../api/entities/User";

declare global {
  namespace Express {
    export interface Request {
      user?: Partial<User>;
    }
  }
}
