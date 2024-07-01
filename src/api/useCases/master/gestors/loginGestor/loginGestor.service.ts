import { schemaValidate } from "../../../../composables/handleSchemaValidate";
import { IHandlePass } from "../../../../providers/passwords/IHandlePass";
import { IHandleToken } from "../../../../providers/tokens/IHandleToken";
import { IGestorRepository } from "../../../../repositories/gestor/IGestorRepository";
import { ILoginGestorDTO } from "./loginGestor.DTO";
import { loginGestorSchema } from "./loginGestor.schema";

export class LoginGestorService {
  constructor(
    private readonly gestorRepository: IGestorRepository,
    private readonly handlePass: IHandlePass,
    private readonly handleToken: IHandleToken,
  ) {}

  async execute({ email, password }: ILoginGestorDTO) {
    await schemaValidate({ email, password }, loginGestorSchema);

    const userFound = await this.gestorRepository.findBy({
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

    const token = this.handleToken.createToken(userFound.id, "gestor");

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
