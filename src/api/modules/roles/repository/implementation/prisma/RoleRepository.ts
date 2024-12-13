import { prismaDb } from "../../../../../../config/prisma";
import { Role } from "../../../model/Role";
import { IRoleRepository } from "../../IRoleRepository";

export class RoleRepository implements IRoleRepository {
  async find(id: number): Promise<Role> {
    const role = await prismaDb.role.findUnique({
      where: {
        id,
      },
      include: {
        roleDefaultPermission: true,
      },
    });

    return role;
  }

  async findAll(): Promise<Role[]> {
    const roles = await prismaDb.role.findMany({
      include: {
        roleDefaultPermission: true,
      },
    });

    return roles;
  }
}
