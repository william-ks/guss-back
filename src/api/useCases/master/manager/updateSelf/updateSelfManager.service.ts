import { IManagerRepository } from "../../../../repositories/manager/IManagerRepository";
import { IUpdateSelfManagerDTO } from "./updateSelfManager.DTO";

type TUpdatableFields = "email" | "cpf";

interface IDataToUpdate extends Partial<IUpdateSelfManagerDTO> {
  permissionsAdd?: number[];
  permissionsRemove?: number[];
}

export class UpdateSelfManagerService {
  constructor(private readonly managerRepository: IManagerRepository) {}

  async execute(props: IUpdateSelfManagerDTO) {
    const { id, name, email, birthday, photo, cpf, permissions } = props;

    const dataToUpdate: IDataToUpdate = {
      name,
      email,
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
      message: string;
    }[] = [
      {
        key: "email",
        value: email,
        message: "Já existe um gestor com esse email cadastrado.",
      },
      {
        key: "cpf",
        value: cpf,
        message: "Já existe um gestor com esse CPF cadastrado.",
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
            message: check.message,
          };
        }
      }
    }

    await this.managerRepository.update({ id, ...dataToUpdate });
  }
}
