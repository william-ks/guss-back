import { Office } from "../../entities/Office";

export interface IOfficeRepository {
  find(id: number): Promise<Office | undefined>;
}
