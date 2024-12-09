import { IManagerRepository } from "../../../../repositories/manager/IManagerRepository";
import { IUpdateSelfManagerDTO } from "./updateSelfManager.DTO";

type TUpdatableFields = "email" | "cpf";

export class UpdateSelfManagerService {
  constructor(private readonly managerRepository: IManagerRepository) {}

  async execute(props: IUpdateSelfManagerDTO) {
    const { id, name, email, birthday, photo, cpf } = props;

    const dataToUpdate: Omit<IUpdateSelfManagerDTO, "id"> = {
      name,
      email,
      birthday,
      cpf,
      photo,
    };

    const fieldsToUpdate = Object.keys(dataToUpdate).filter(
      (key) => dataToUpdate[key] !== undefined,
    );

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
