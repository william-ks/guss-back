import { IManagerRepository } from "../../../../repositories/manager/managers/repository/IManagerRepository";

export class ListAllManagerService {
  constructor(private managerRepository: IManagerRepository) {}

  async execute() {
    const gestorsRaw = await this.managerRepository.findAll();

    const gestorsRedo = gestorsRaw.map((el) => {
      const { password, id, ...data } = el;
      return data;
    });

    return gestorsRedo;
  }
}
