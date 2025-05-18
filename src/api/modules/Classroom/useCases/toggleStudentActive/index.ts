import { ClassroomRepository } from "../../repository/ClassroomRepository";
import { ToggleStudentActiveController } from "./toggleStudentActive.controller";
import { ToggleStudentActiveService } from "./toggleStudentActive.service";
import {
	toggleStudentActiveSchema,
	TToggleStudentActiveParams,
} from "./entities/toggleStudentActive.schema";

const classroomRepository = new ClassroomRepository();
const toggleStudentActiveService = new ToggleStudentActiveService(
	classroomRepository,
);
const toggleStudentActiveController = new ToggleStudentActiveController(
	toggleStudentActiveService,
);

export {
	toggleStudentActiveController,
	toggleStudentActiveSchema,
	TToggleStudentActiveParams,
};
