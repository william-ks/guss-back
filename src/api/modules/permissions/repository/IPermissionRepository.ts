import { Permission } from "../model/Permission";

export interface IPermissionRepository {
  findById(id: number): Promise<Permission | undefined>;
  findAll(): Promise<Permission[]>;
}
