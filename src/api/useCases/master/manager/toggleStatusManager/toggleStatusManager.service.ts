import { schemaValidate } from "../../../../composables/handleSchemaValidate";
import { IManagerRepository } from "../../../../repositories/manager/IManagerRepository";
import { IToggleStatusManagerDTO } from "./toggleStatusManager.DTO";
import { ToggleStatusManagerSchema } from "./toggleStatusManager.schema";

export class ToggleStatusManagerService {
  constructor(private readonly managerRepository: IManagerRepository) {}

  async execute(props: IToggleStatusManagerDTO) {
    await schemaValidate(props, ToggleStatusManagerSchema);

    const { status, managerToToggleId, selfId } = props;

    const manager = await this.managerRepository.findBy({
      key: "public_id",
      value: managerToToggleId,
    });

    if (!manager) {
      throw {
        code: 404,
        message: "Gestor não encontrado.",
      };
    }

    if (manager.id === selfId) {
      throw {
        code: 401,
        message: "Não é possível alterar o status de si mesmo.",
      };
    }

    await this.managerRepository.toggleStatus({
      public_id: managerToToggleId,
      status,
    });
  }
}
