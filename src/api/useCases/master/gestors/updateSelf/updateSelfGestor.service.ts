import { IGestorRepository } from "../../../../repositories/gestor/IGestorRepository";
import { IUpdateSelfGestorDTO } from "./updateSelfGestor.DTO";

type TUpdatableFields = "email" | "cpf";

export class UpdateSelfGestorService {
  constructor(private readonly gestorRepo: IGestorRepository) {}

  async execute(props: IUpdateSelfGestorDTO) {
    const { id, name, email, birthDate, cpf, address } = props;

    const dataToUpdate: Omit<IUpdateSelfGestorDTO, "id"> = {
      name,
      email,
      birthDate,
      cpf,
      address,
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
        const alreadyExists = await this.gestorRepo.findAnother({
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

    await this.gestorRepo.update({ id, ...dataToUpdate });
  }
}
