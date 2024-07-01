import { db } from "../../../../config/prisma";
import { Office } from "../../../entities/Office";
import { IOfficeRepository } from "../IOfficeRepository";

export class OfficeRepository implements IOfficeRepository {
  async find(id: number): Promise<Office> {
    const office = await db.office.findUnique({
      where: {
        id,
      },
    });

    return office;
  }
}
