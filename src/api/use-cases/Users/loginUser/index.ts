import { HandlePass } from "../../../providers/implementations/HandlePass";
import { HandleToken } from "../../../providers/implementations/handleToken";
import { UserRepository } from "../../../repositories/implementations/UserRepositoty";
import { LoginUserController } from "./loginUser.controller";
import { LoginUserService } from "./loginUser.service";

const userRepository = new UserRepository();
const handlePass = new HandlePass();
const handleToken = new HandleToken();

const loginUserService = new LoginUserService(
  userRepository,
  handlePass,
  handleToken,
);

const loginUserController = new LoginUserController(loginUserService);

export { loginUserController };
