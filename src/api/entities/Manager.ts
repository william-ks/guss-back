import { idGenerator } from "../composables/idGenerator";
import { ManagerPermission } from "./ManagerPermission";
import { Role } from "./Role";

export class Manager {
  public readonly id?: number;
  public readonly public_id: string;
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

  constructor(props: Omit<Manager, "public_id">, public_id?: string) {
    Object.assign(this, props);

    if (!public_id) {
      this.public_id = idGenerator();
    } else {
      this.public_id = public_id;
    }
  }
}
