import { StudentRepository } from "../../repository/StudentRepository";
import { ReadSelfStudentController } from "./readSelfStudent.controller";
import { ReadSelfStudentService } from "./readSelfStudent.service";
import { readSelfStudentSchema } from "./entities/readSelfStudent.schema";

const studentRepository = new StudentRepository();
const readSelfStudentService = new ReadSelfStudentService(studentRepository);
const readSelfStudentController = new ReadSelfStudentController(
	readSelfStudentService,
);

export { readSelfStudentController, readSelfStudentSchema };
