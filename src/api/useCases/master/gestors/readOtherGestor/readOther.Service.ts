import { IGestorRepository } from "../../../../repositories/gestor/IGestorRepository";
import { IReadOtherGestorDTO } from "./readOther.DTO";

export class ReadOtherGestorService {
  constructor(private readonly gestorRepository: IGestorRepository) {}

  async execute({ wantedId }: IReadOtherGestorDTO) {
    const foundedGestor = await this.gestorRepository.findBy({
      key: "id",
      value: wantedId,
    });

    if (!foundedGestor) {
      throw {
        code: 404,
        message: "Usuário não encontrado.",
      };
    }

    const { password, ...gestor } = foundedGestor;

    return gestor;
  }
}
