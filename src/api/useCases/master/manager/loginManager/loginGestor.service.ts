import { schemaValidate } from "../../../../composables/handleSchemaValidate";
import { IHandlePass } from "../../../../providers/passwords/IHandlePass";
import { IHandleToken } from "../../../../providers/tokens/IHandleToken";
import { IManagerRepository } from "../../../../repositories/manager/IManagerRepository";
import { ILoginManagerDTO } from "./loginGestor.DTO";
import { loginManagerSchema } from "./loginGestor.schema";

export class LoginManagerService {
  constructor(
    private readonly managerRepository: IManagerRepository,
    private readonly handlePass: IHandlePass,
    private readonly handleToken: IHandleToken,
  ) {}

  async execute({ email, password }: ILoginManagerDTO) {
    await schemaValidate({ email, password }, loginManagerSchema);

    const userFound = await this.managerRepository.findBy({
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

    const token = this.handleToken.createToken({
      public_id: userFound.public_id,
      to: "manager",
    });

    return {
      user: {
        name: userFound.name,
        email: userFound.email,
        role: userFound.role.title,
      },
      token,
    };
  }
}
