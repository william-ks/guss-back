import { s } from "vitest/dist/reporters-1evA5lom";
import { db } from "../../../../config/prisma";
import { Gestor } from "../../../entities/gestor";
import {
  IFindBy,
  IGestorRepository,
  ISaveGestor,
  IToggleStatus,
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

  async save(props: ISaveGestor): Promise<void> {
    const { name, email, officeId, password, Feature } = props;
    await db.gestor.create({
      data: {
        name,
        email,
        password,
        officeId,
      },
    });
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
