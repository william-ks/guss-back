import { Permission } from "../../entities/Permission";

export interface IPermissionRepository {
  find(id: number): Promise<Permission | undefined>;
}
