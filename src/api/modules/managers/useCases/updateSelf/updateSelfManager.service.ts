import { updateSelfManagerSchema } from "./updateSelfManager.schema";
import { IUpdateSelfManagerDTO } from "./updateSelfManager.DTO";
import { schemaValidate } from "../../../../composables/handleSchemaValidate";
import { IManagerRepository } from "../../repository/IManagerRepository";

type TUpdatableFields = "email" | "cpf";

interface IDataToUpdate extends Partial<IUpdateSelfManagerDTO> {}

export class UpdateSelfManagerService {
  constructor(private readonly managerRepository: IManagerRepository) {}

  async execute(props: IUpdateSelfManagerDTO) {
    await schemaValidate(props, updateSelfManagerSchema);
    const { id, name, roleId, email, birthday, photo, cpf, permissions } =
      props;

    const preDataToUpdate: IDataToUpdate = {
      name,
      email,
      roleId,
      birthday,
      cpf,
      photo,
      permissions,
    };

    const fieldsToUpdate = Object.keys(preDataToUpdate).filter((key) => {
      if (key === "photo") {
        return (
          preDataToUpdate[key] !== null && preDataToUpdate[key] !== undefined
        );
      }

      if (key !== "permissions") {
        return preDataToUpdate[key] !== undefined;
      } else {
        return preDataToUpdate[key] !== undefined && permissions.length > 0;
      }
    });

    if (fieldsToUpdate.length <= 0) {
      throw {
        code: 400,
        message:
          "There is not enough data to update the current manager's information.",
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

    const dataToUpdate = {};

    for (const field of fieldsToUpdate) {
      dataToUpdate[field] = preDataToUpdate[field];
    }

    await this.managerRepository.update({ id, ...dataToUpdate });
  }
}
