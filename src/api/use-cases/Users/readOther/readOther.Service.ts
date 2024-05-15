import { IUserRepository } from "../../../repositories/IUserRepository";
import { IReadOtherDTO } from "./readOther.DTO";

export class ReadOtherService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ userId, wantedId }: IReadOtherDTO) {
    const foundedUser = await this.userRepository.findBy({
      key: "id",
      value: wantedId,
    });

    if (!foundedUser) {
      throw {
        code: 404,
        message: "Usuário não encontrado.",
      };
    }

    const { password, ...user } = foundedUser;

    return user;
  }
}
