import { db } from "../../../../../config/prisma";
import { Manager } from "../../model/Manager";
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
    const { id, permissions, ...dataToUpdate } = props;

    if (permissions && permissions.length > 0) {
      for (const permission of permissions) {
        await db.managerPermission.findFirst({
          where: {
            managerId: id,
            permissionId: permission.id,
          },
        });

        if (permission.toAdd && !permission.toRemove) {
          await db.managerPermission.create({
            data: {
              managerId: id,
              permissionId: permission.id,
            },
          });
        } else if (permission.toRemove && !permission.toAdd) {
          await db.managerPermission.deleteMany({
            where: {
              managerId: id,
              permissionId: permission.id,
            },
          });
        } else {
          throw {
            code: 400,
            message: "Error on update user",
          };
        }
      }
    }

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
