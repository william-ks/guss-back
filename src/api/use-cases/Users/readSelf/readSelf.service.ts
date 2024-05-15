import { IUserRepository } from "../../../repositories/IUserRepository";
import { ReadSelfDTO } from "./readSelf.DTO";

export class ReadSelfService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ id }: ReadSelfDTO) {
    const user = await this.userRepository.findBy({
      key: "id",
      value: id,
    });

    return user;
  }
}
