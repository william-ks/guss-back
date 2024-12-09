import { Manager } from "./Manager";
import { RoleDefaultPermission } from "./RoleDefaultPermission";

export class Role {
  public readonly id?: number;
  public title: string;
  public managers?: Manager[];
  public roleDefaultPermission?: RoleDefaultPermission;

  constructor(props: Role) {
    Object.assign(this, props);
  }
}
