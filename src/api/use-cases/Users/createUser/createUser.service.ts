import { IHandlePass } from "../../../providers/IHandlePass";
import { IOfficeRepository } from "../../../repositories/IOfficeRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateUserDTO } from "./createUser.DTO";

export class CreateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly handlePass: IHandlePass,
    private readonly officeRepository: IOfficeRepository,
  ) {}

  async execute(props: ICreateUserDTO) {
    const { name, email, officeId } = props;

    const emailAlreadyExists = await this.userRepository.findBy({
      key: "email",
      value: email,
    });

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

    await this.userRepository.save({
      name,
      email,
      officeId,
      password: await this.handlePass.encrypt(password),
    });

    return password;
  }
}
