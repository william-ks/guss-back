import { prismaDb } from "../../../../../../config/prisma";
import { Permission } from "../../../model/Permission";
import { IPermissionRepository } from "../../IPermissionRepository";

export class PermissionRepository implements IPermissionRepository {
  async findById(id: number): Promise<Permission> {
    const role = await prismaDb.permission.findUnique({
      where: {
        id,
      },
    });

    return role;
  }
}