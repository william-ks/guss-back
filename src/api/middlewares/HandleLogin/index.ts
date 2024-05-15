import { HandleToken } from "../../providers/implementations/handleToken";
import { UserRepository } from "./../../repositories/implementations/UserRepositoty";
import { HandleLogin } from "./HandleLogin";

const userRepository = new UserRepository();
const handleToken = new HandleToken();
const handleLogin = new HandleLogin(userRepository, handleToken);

export { handleLogin };
