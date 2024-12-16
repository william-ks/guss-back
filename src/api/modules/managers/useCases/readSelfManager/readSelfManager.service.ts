import { IManagerRepository } from "../../repository/IManagerRepository";
import { ReadSelfManagerDTO } from "./readSelfManager.DTO";

export class ReadSelfManagerService {
  constructor(private readonly managerRepository: IManagerRepository) {}

  async execute({ id }: ReadSelfManagerDTO) {
    const manager = await this.managerRepository.findBy({
      key: "id",
      value: id,
    });

    const { password, id: myId, ...toReturn } = manager;

    return toReturn;
  }
}
