import { StudentRepository } from "../../repository/StudentRepository";
import { ToggleStudentStatusController } from "./toggleStudentStatus.controller";
import { ToggleStudentStatusService } from "./toggleStudentStatus.service";
import {
	toggleStudentStatusSchema,
	TToggleStudentStatusBody,
	TToggleStudentStatusParams,
} from "./entities/toggleStudentStatus.schema";

const studentRepository = new StudentRepository();
const toggleStudentStatusService = new ToggleStudentStatusService(
	studentRepository,
);
const toggleStudentStatusController = new ToggleStudentStatusController(
	toggleStudentStatusService,
);

export {
	toggleStudentStatusController,
	toggleStudentStatusSchema,
	TToggleStudentStatusBody,
	TToggleStudentStatusParams,
};
