import { db } from "../../../../config/prisma";
import { Permission } from "../../../entities/Permission";
import { IPermissionRepository } from "../IPermissionRepository";

export class PermissionRepository implements IPermissionRepository {
  async findById(id: number): Promise<Permission> {
    const role = await db.permission.findUnique({
      where: {
        id,
      },
    });

    return role;
  }
}
