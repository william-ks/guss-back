import { IGestorRepository } from "../../../../repositories/gestor/IGestorRepository";

export class ListAllGestorsService {
  constructor(private gestorRepository: IGestorRepository) {}

  async execute() {
    const gestorsRaw = await this.gestorRepository.findAll();

    const gestorsRedo = gestorsRaw.map((el) => {
      const { password, id, ...data } = el;
      return data;
    });

    return gestorsRedo;
  }
}
