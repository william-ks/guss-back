import { Office } from "../../entities/Office";

export interface IOfficeRepository {
  find(id: string): Promise<Office | undefined>;
}
