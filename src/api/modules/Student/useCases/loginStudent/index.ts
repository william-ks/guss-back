import { StudentRepository } from "../../repository/StudentRepository";
import { LoginStudentController } from "./loginStudent.controller";
import { LoginStudentService } from "./loginStudent.service";
import {
	loginStudentSchema,
	TLoginStudentBody,
} from "./entities/loginStudent.schema";
import { PasswordProvider } from "../../../../providers/PasswordProvider/PasswordProvider";
import { TokenProvider } from "../../../../providers/TokenProvider/TokenProvider";

const studentRepository = new StudentRepository();
const handlePass = new PasswordProvider();
const handleToken = new TokenProvider();
const loginStudentService = new LoginStudentService(
	studentRepository,
	handlePass,
	handleToken,
);
const loginStudentController = new LoginStudentController(loginStudentService);

export { loginStudentController, loginStudentSchema, TLoginStudentBody };
