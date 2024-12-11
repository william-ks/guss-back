import { Permission } from "../../modules/permissions/model/Permission";
import { Role } from "../../modules/roles/model/Role";

export class RoleDefaultPermission {
  public readonly id?: number;

  public permission?: Permission;
  public permissionId: number;

  public role?: Role;
  public roleId: number;

  constructor(props: RoleDefaultPermission) {
    Object.assign(this, props);
  }
}
