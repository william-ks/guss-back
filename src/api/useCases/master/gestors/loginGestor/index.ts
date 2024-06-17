import { HandlePass } from "../../../../providers/passwords/implementations/HandlePass";
import { HandleToken } from "../../../../providers/tokens/implementations/handleToken";
import { GestorRepository } from "../../../../repositories/gestor/implementation/GestorRepository";
import { LoginGestorController } from "./loginGestor.controller";
import { LoginGestorService } from "./loginGestor.service";

const gestorRepository = new GestorRepository();
const handlePass = new HandlePass();
const handleToken = new HandleToken();

const loginGestorService = new LoginGestorService(
  gestorRepository,
  handlePass,
  handleToken,
);

const loginGestorController = new LoginGestorController(loginGestorService);

export { loginGestorController };
