import { db } from "../../../../config/prisma";
import { Role } from "../../../entities/Role";
import { IRoleRepository } from "../IRoleRepository";

export class OfficeRepository implements IRoleRepository {
  async find(id: number): Promise<Role> {
    const role = await db.role.findUnique({
      where: {
        id,
      },
    });

    return role;
  }
}
