import { TToggleStudentStatusBody } from "./toggleStudentStatus.schema";

export interface IToggleStudentStatusDTO extends TToggleStudentStatusBody {
	studentId: string;
}
