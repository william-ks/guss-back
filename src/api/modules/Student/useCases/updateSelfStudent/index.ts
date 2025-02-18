import { StudentRepository } from "../../repository/StudentRepository";
import { UpdateSelfStudentController } from "./updateSelfStudent.controller";
import { UpdateSelfStudentService } from "./updateSelfStudent.service";
import {
	updateSelfStudentSchema,
	TUpdateSelfStudentBody,
} from "./entities/updateSelfStudent.schema";
import { PasswordProvider } from "../../../../providers/PasswordProvider/PasswordProvider";

const studentRepository = new StudentRepository();
const handlePass = new PasswordProvider();
const updateSelfStudentService = new UpdateSelfStudentService(
	studentRepository,
	handlePass,
);
const updateSelfStudentController = new UpdateSelfStudentController(
	updateSelfStudentService,
);

export {
	updateSelfStudentController,
	updateSelfStudentSchema,
	TUpdateSelfStudentBody,
};
