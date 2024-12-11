import { Manager } from "../../modules/managers/model/Manager";
import { Permission } from "../../modules/permissions/model/Permission";

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
