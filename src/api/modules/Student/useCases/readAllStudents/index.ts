import { StudentRepository } from "../../repository/StudentRepository";
import { ReadAllStudentsController } from "./readAllStudents.controller";
import { ReadAllStudentsService } from "./readAllStudents.service";
import { readAllStudentsSchema } from "./entities/readAllStudents.schema";

const studentRepository = new StudentRepository();
const readAllStudentsService = new ReadAllStudentsService(studentRepository);
const readAllStudentsController = new ReadAllStudentsController(
	readAllStudentsService,
);

export { readAllStudentsController, readAllStudentsSchema };
