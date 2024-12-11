import { Manager } from "./Manager";
import { Permission } from "./Permission";

export class ManagerPermission {
  public readonly id: number;

  public permission?: Permission;
  public permissionId: number;

  public manager?: Manager;
  public managerId: number;

  constructor(props: ManagerPermission) {
    Object.assign(this, props);
  }
}
