import { db } from "../../../../config/prisma";
import { Manager } from "../../../entities/Manager";
import {
  IFindAnother,
  IFindBy,
  IManagerRepository,
  ISaveManager,
  IToggleStatus,
  IUpdateManager,
} from "../IManagerRepository";

export class ManagerRepository implements IManagerRepository {
  async findBy({ key, value }: IFindBy): Promise<Manager> {
    const found = await db.manager.findFirst({
      where: {
        [key]: value,
      },
      include: {
        role: {
          select: {
            title: true,
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return found;
  }

  async findAnother({ id, key, value }: IFindAnother): Promise<Manager> {
    const found = await db.manager.findFirst({
      where: {
        [key]: value,
        AND: {
          NOT: {
            id,
          },
        },
      },
      include: {
        role: {
          select: {
            title: true,
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return found;
  }

  async findAll(): Promise<Manager[]> {
    const managers = await db.manager.findMany({
      include: {
        role: {
          select: {
            title: true,
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return managers;
  }

  async update(props: IUpdateManager): Promise<void> {
    const { id, ...dataToUpdate } = props;

    await db.manager.update({
      data: {
        ...dataToUpdate,
      },
      where: {
        id,
      },
    });
  }

  async save(props: ISaveManager): Promise<void> {
    const { name, public_id, email, roleId, password, birthday, cpf } = props;
    await db.manager.create({
      data: {
        name,
        public_id,
        email,
        password,
        roleId,
        birthday,
        cpf,
      },
    });
  }

  async toggleStatus(props: IToggleStatus): Promise<void> {
    const { public_id, status } = props;

    await db.manager.update({
      where: {
        public_id,
      },
      data: {
        isActive: status,
      },
    });
  }
}
