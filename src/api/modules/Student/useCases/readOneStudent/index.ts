import { StudentRepository } from "../../repository/StudentRepository";
import { ReadOneStudentController } from "./readOneStudent.controller";
import { ReadOneStudentService } from "./readOneStudent.service";
import {
	readOneStudentSchema,
	TReadOneStudentParams,
} from "./entities/readOneStudent.schema";

const studentRepository = new StudentRepository();
const readOneStudentService = new ReadOneStudentService(studentRepository);
const readOneStudentController = new ReadOneStudentController(
	readOneStudentService,
);

export {
	readOneStudentController,
	readOneStudentSchema,
	TReadOneStudentParams,
};
