import { IManagerRepository } from "../../repository/IManagerRepository";
import { IReadOtherManagerDTO } from "./readOther.DTO";

export class ReadOtherManagerService {
  constructor(private readonly managerRepository: IManagerRepository) {}

  async execute({ wantedId }: IReadOtherManagerDTO) {
    const foundedManager = await this.managerRepository.findBy({
      key: "publicId",
      value: wantedId,
    });

    if (!foundedManager) {
      throw {
        code: 404,
        message: "Usuário não encontrado.",
      };
    }

    const { password, id: personal, ...manager } = foundedManager;

    return manager;
  }
}
