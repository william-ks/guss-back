import { IGestorRepository } from "../../../../repositories/gestor/IGestorRepository";
import { ReadSelfGestorDTO } from "./readSelfGestor.DTO";

export class ReadSelfGestorService {
  constructor(private readonly gestorRepository: IGestorRepository) {}

  async execute({ id }: ReadSelfGestorDTO) {
    const gestor = await this.gestorRepository.findBy({
      key: "id",
      value: id,
    });

    const { password, id: myId, ...toReturn } = gestor;

    return toReturn;
  }
}
