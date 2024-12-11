import { HandlePass } from "../../../../providers/passwords/implementations/HandlePass";
import { HandleToken } from "../../../../providers/tokens/implementations/handleToken";
import { ManagerRepository } from "../../repository/implementation/ManagerRepository";
import { LoginManagerController } from "./loginGestor.controller";
import { LoginManagerService } from "./loginGestor.service";

const managerRepository = new ManagerRepository();
const handlePass = new HandlePass();
const handleToken = new HandleToken();

const loginManagerService = new LoginManagerService(
  managerRepository,
  handlePass,
  handleToken,
);

const loginManagerController = new LoginManagerController(loginManagerService);

export { loginManagerController };
