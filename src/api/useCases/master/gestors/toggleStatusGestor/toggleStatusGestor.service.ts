import { schemaValidate } from "../../../../composables/handleSchemaValidate";
import { IGestorRepository } from "../../../../repositories/gestor/IGestorRepository";
import { IToggleStatusGestorDTO } from "./toggleStatusGestor.DTO";
import { ToggleStatusGestorSchema } from "./toggleStatusGestor.schema";

export class ToggleStatusGestorSerice {
  constructor(private readonly gestorRepository: IGestorRepository) {}

  async execute(props: IToggleStatusGestorDTO) {
    await schemaValidate(props, ToggleStatusGestorSchema);

    const { status, gestorToToggleId, selfId } = props;

    const gestor = await this.gestorRepository.findBy({
      key: "public_id",
      value: gestorToToggleId,
    });

    if (!gestor) {
      throw {
        code: 404,
        message: "Gestor não encontrado.",
      };
    }

    if (gestor.id === selfId) {
      throw {
        code: 403,
        message: "Não é possível alterar o status de si mesmo.",
      };
    }

    await this.gestorRepository.toggleStatus({
      public_id: gestorToToggleId,
      status,
    });
  }
}
