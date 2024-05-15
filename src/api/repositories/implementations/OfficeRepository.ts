import { prisma } from "../../../config/prisma";
import { Office } from "../../entities/Office";
import { IOfficeRepository } from "../IOfficeRepository";

export class OfficeRepository implements IOfficeRepository {
  async find(id: string): Promise<Office> {
    const office = await prisma.office.findUnique({
      where: {
        id,
      },
    });

    return office;
  }
}
