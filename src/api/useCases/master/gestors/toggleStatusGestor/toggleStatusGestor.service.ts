import { schemaValidate } from "../../../../composables/handleSchemaValidate";
import { IGestorRepository } from "../../../../repositories/gestor/IGestorRepository";
import { IToggleStatusGestorDTO } from "./toggleStatusGestor.DTO";
import { ToggleStatusGestorSchema } from "./toggleStatusGestor.schema";

export class ToggleStatusGestorSerice {
  constructor(private readonly gestorRepository: IGestorRepository) {}

  async execute(props: IToggleStatusGestorDTO) {
    await schemaValidate(props, ToggleStatusGestorSchema);

    const { status, gestorToToggleId, selfId } = props;

    if (gestorToToggleId === selfId) {
      throw {
        code: 403,
        message: "Não é possível alterar o status de si mesmo.",
      };
    }

    const gestor = await this.gestorRepository.findBy({
      key: "id",
      value: gestorToToggleId,
    });

    if (!gestor) {
      throw {
        code: 404,
        message: "Gestor não encontrado.",
      };
    }

    await this.gestorRepository.toggleStatus({
      id: gestorToToggleId,
      status,
    });
  }
}
