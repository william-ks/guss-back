import { Permission } from "../../entities/Permission";

export interface IPermissionRepository {
  findById(id: number): Promise<Permission | undefined>;
}
