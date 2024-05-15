import { IHandlePass } from "../../../providers/IHandlePass";
import { IHandleToken } from "../../../providers/IHandleToken";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ILoginUserDTO } from "./loginUser.DTO";

export class LoginUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly handlePass: IHandlePass,
    private readonly handleToken: IHandleToken,
  ) {}

  async execute({ email, password }: ILoginUserDTO) {
    const userFound = await this.userRepository.findBy({
      key: "email",
      value: email,
    });

    if (!userFound) {
      throw {
        code: 404,
        message: "Usuário não encontrado.",
      };
    }

    const isInValidPass = await this.handlePass.isInValid({
      pass: password,
      hash: userFound.password,
    });

    if (isInValidPass) {
      throw {
        code: 400,
        message: "Usuário e/ou senha incorretos.",
      };
    }

    const token = this.handleToken.createToken(userFound.id);

    return {
      user: {
        name: userFound.name,
        email: userFound.email,
        office: userFound.officeId,
      },
      token,
    };
  }
}
