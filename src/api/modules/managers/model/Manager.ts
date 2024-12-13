import { idGenerator } from "../../../composables/idGenerator";
import { ManagerPermission } from "../../../shared/models/ManagerPermission";
import { Role } from "../../roles/model/Role";

export class Manager {
  public readonly id?: number;
  public readonly publicId: string;
  public photo?: string;
  public name: string;
  public cpf: string;
  public email: string;
  public password: string;
  public birthday?: string;
  public role?: Role;
  public roleId: number;
  public started_at: Date;
  public isActive: boolean;
  public permissions?: ManagerPermission[];

  constructor(props: Omit<Manager, "publicId">, publicId?: string) {
    Object.assign(this, props);

    if (!publicId) {
      this.publicId = idGenerator();
    } else {
      this.publicId = publicId;
    }
  }
}
