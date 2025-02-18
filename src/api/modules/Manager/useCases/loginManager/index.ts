import { ManagerRepository } from "../../repository/ManagerRepository";
import { LoginManagerController } from "./loginManager.controller";
import { LoginManagerService } from "./loginManager.service";
import {
	loginManagerSchema,
	TLoginManagerBody,
} from "./entities/loginManager.schema";
import { PasswordProvider } from "../../../../providers/PasswordProvider/PasswordProvider";
import { TokenProvider } from "../../../../providers/TokenProvider/TokenProvider";

const managerRepository = new ManagerRepository();
const handlePass = new PasswordProvider();
const handleToken = new TokenProvider();
const loginManagerService = new LoginManagerService(
	managerRepository,
	handlePass,
	handleToken,
);
const loginManagerController = new LoginManagerController(loginManagerService);

export { loginManagerController, loginManagerSchema, TLoginManagerBody };
