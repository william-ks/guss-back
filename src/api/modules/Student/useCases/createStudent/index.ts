import { PasswordProvider } from "../../../../providers/PasswordProvider/PasswordProvider";
import { StudentRepository } from "../../repository/StudentRepository";
import { CreateStudentController } from "./createStudent.controller";
import { CreateStudentService } from "./createStudent.service";
import {
	createStudentSchema,
	TCreateStudentBody,
} from "./entities/createStudent.schema";

const studentRepository = new StudentRepository();
const handlePass = new PasswordProvider();
const createStudentService = new CreateStudentService(
	studentRepository,
	handlePass,
);
const createStudentController = new CreateStudentController(
	createStudentService,
);

export { createStudentController, createStudentSchema, TCreateStudentBody };
