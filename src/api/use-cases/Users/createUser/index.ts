import { HandlePass } from "../../../providers/implementations/HandlePass";
import { OfficeRepository } from "../../../repositories/implementations/OfficeRepository";
import { UserRepository } from "../../../repositories/implementations/UserRepositoty";
import { CreateUserController } from "./createUser.controller";
import { CreateUserService } from "./createUser.service";

const userRepository = new UserRepository();
const handlePass = new HandlePass();
const officeRepoository = new OfficeRepository();
const createUserService = new CreateUserService(
  userRepository,
  handlePass,
  officeRepoository,
);
const createUserController = new CreateUserController(createUserService);

export { createUserController };
