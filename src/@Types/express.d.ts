import { Manager } from "../api/modules/managers/model/Manager";
import { Student } from "../api/modules/students/model/Student";

declare global {
  namespace Express {
    export interface Request {
      manager?: Partial<Manager>;
      student?: Partial<Student>;
    }
  }
}
