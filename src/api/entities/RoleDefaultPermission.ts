import { Permission } from "./Permission";
import { Role } from "./Role";

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
