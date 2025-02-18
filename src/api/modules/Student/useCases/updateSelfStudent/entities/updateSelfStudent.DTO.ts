import { Student } from "../../../model/Student";
import { TUpdateSelfStudentBody } from "./updateSelfStudent.schema";

export interface IUpdateSelfStudentDTO extends TUpdateSelfStudentBody {
	student: Student;
}
