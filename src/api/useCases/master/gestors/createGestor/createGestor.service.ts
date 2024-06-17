import { schemaValidate } from "../../../../composables/handleSchemaValidate";
import { IHandlePass } from "../../../../providers/passwords/IHandlePass";
import { IGestorRepository } from "../../../../repositories/gestor/IGestorRepository";
import { IOfficeRepository } from "../../../../repositories/office/IOfficeRepository";
import { ICreateGestorDTO } from "./createGestor.DTO";
import { createUserSchema } from "./createGestor.schema";

export class CreateGestorService {
  constructor(
    private readonly gestorRepository: IGestorRepository,
    private readonly handlePass: IHandlePass,
    private readonly officeRepository: IOfficeRepository,
  ) {}

  async execute(props: ICreateGestorDTO) {
    const { name, email, officeId } = props;
    await schemaValidate({ name, email, officeId }, createUserSchema);

    const emailAlreadyExists = await this.gestorRepository.findBy({
      key: "email",
      value: email,
    });

    console.log(emailAlreadyExists);

    if (emailAlreadyExists) {
      throw {
        code: 400,
        message: "Este e-mail já existe.",
      };
    }

    const officeFound = await this.officeRepository.find(officeId);

    if (!officeFound) {
      throw {
        code: 404,
        message: "Este cargo não existe.",
      };
    }

    const password = this.handlePass.generatePass(12);

    await this.gestorRepository.save({
      name,
      email,
      officeId,
      password: await this.handlePass.encrypt(password),
    });

    return password;
  }
}
