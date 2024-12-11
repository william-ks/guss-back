import { updateSelfManagerSchema } from "./updateSelfManager.schema";
import { IManagerRepository } from "../../../../repositories/manager/IManagerRepository";
import { IUpdateSelfManagerDTO } from "./updateSelfManager.DTO";
import { schemaValidate } from "../../../../composables/handleSchemaValidate";

type TUpdatableFields = "email" | "cpf";

interface IDataToUpdate extends Partial<IUpdateSelfManagerDTO> {}

export class UpdateSelfManagerService {
  constructor(private readonly managerRepository: IManagerRepository) {}

  async execute(props: IUpdateSelfManagerDTO) {
    await schemaValidate(props, updateSelfManagerSchema);
    const { id, name, roleId, email, birthday, photo, cpf, permissions } =
      props;

    const dataToUpdate: IDataToUpdate = {
      name,
      email,
      roleId,
      birthday,
      cpf,
      photo,
      permissions,
    };

    const fieldsToUpdate = Object.keys(dataToUpdate).filter((key) => {
      if (key !== "permissions") {
        return dataToUpdate[key] !== undefined;
      } else {
        return dataToUpdate[key] !== undefined && permissions.length > 0;
      }
    });

    if (fieldsToUpdate.length <= 0) {
      throw {
        code: 400,
        message:
          "Não há dados suficientes para atualizar os dados do gestor atual.",
      };
    }

    const checks: {
      key: TUpdatableFields;
      value: string | undefined;
      message1: string;
      message2: string;
    }[] = [
      {
        key: "email",
        value: email,
        message1: "Já existe um gestor com esse email cadastrado.",
        message2: "This field can't be null",
      },
      {
        key: "cpf",
        value: cpf,
        message1: "Já existe um gestor com esse CPF cadastrado.",
        message2: "This field can't be null",
      },
    ];

    for (const check of checks) {
      if (check.value) {
        const alreadyExists = await this.managerRepository.findAnother({
          id,
          key: check.key,
          value: check.value,
        });

        if (alreadyExists) {
          throw {
            code: 400,
            message: check.message1,
          };
        }
      } else if (check.value === "") {
        throw {
          code: 400,
          message: check.message2,
        };
      }
    }

    await this.managerRepository.update({ id, ...dataToUpdate });
  }
}
