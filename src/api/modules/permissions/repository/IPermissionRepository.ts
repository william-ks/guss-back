import { Permission } from "../../modules/permissions/model/Permission";

export interface IPermissionRepository {
  findById(id: number): Promise<Permission | undefined>;
}
