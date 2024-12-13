import { RoleDefaultPermission } from "../../../shared/models/RoleDefaultPermission";
import { Manager } from "../../managers/model/Manager";

export class Role {
  public readonly id?: number;
  public title: string;
  public managers?: Manager[];
  public roleDefaultPermission?: RoleDefaultPermission[];

  constructor(props: Role) {
    Object.assign(this, props);
  }
}
