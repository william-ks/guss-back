import { Office } from "../../src/api/entities/Office";
import { IOfficeRepository } from "../../src/api/repositories/IOfficeRepository";
import db, { IDB } from "../memoryDb";

export class MemoryOfficeRepository implements IOfficeRepository {
  public db: IDB;

  constructor() {
    this.db = db;
  }

  async find(id: string): Promise<Office | undefined> {
    const officeFound = this.db.offices.find((office) => office.id === id);

    return officeFound;
  }
}
