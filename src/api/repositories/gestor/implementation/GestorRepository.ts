import { s } from "vitest/dist/reporters-1evA5lom";
import { db } from "../../../../config/prisma";
import { Gestor } from "../../../entities/gestor";
import {
  IFindAnother,
  IFindBy,
  IGestorRepository,
  ISaveGestor,
  IToggleStatus,
  IUpdateGestor,
} from "../IGestorRepository";

export class GestorRepository implements IGestorRepository {
  async findBy({ key, value }: IFindBy): Promise<Gestor> {
    const found = await db.gestor.findFirst({
      where: {
        [key]: value,
      },
      include: {
        office: {
          select: {
            title: true,
          },
        },
      },
    });

    return found;
  }

  async findAnother({ id, key, value }: IFindAnother): Promise<Gestor> {
    const found = await db.gestor.findFirst({
      where: {
        [key]: value,
        AND: {
          NOT: {
            id,
          },
        },
      },
      include: {
        office: {
          select: {
            title: true,
          },
        },
      },
    });

    return found;
  }

  async findAll(): Promise<Gestor[]> {
    const gestors = await db.gestor.findMany({
      include: {
        office: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return gestors;
  }

  async update(props: IUpdateGestor): Promise<void> {
    const { id, ...dataToUpdate } = props;

    await db.gestor.update({
      data: {
        ...dataToUpdate,
      },
      where: {
        id,
      },
    });
  }

  async save(props: ISaveGestor): Promise<void> {
    const { name, email, officeId, password, address, birthDate, cpf } = props;
    await db.gestor.create({
      data: {
        name,
        email,
        password,
        officeId,
        address,
        birthDate,
        cpf,
      },
    });
  }

  async toggleStatus(props: IToggleStatus): Promise<void> {
    const { id, status } = props;

    await db.gestor.update({
      where: {
        id,
      },
      data: {
        is_active: status,
      },
    });
  }
}
