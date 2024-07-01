import { idGenerator } from "../composables/idGenerator";
import { Feature } from "./Feature";
import { Office } from "./Office";

export class Gestor {
  public readonly id?: number;
  public readonly public_id: string;
  public name: string;
  public email: string;
  public password: string;
  public photo?: string;
  public birthDate?: string;
  public officeId: number;
  public office: Office;
  public started_at: Date;
  public is_active: boolean;

  public UserFeatures?: Feature[];

  constructor(props: Omit<Gestor, "public_id">, public_id?: string) {
    Object.assign(this, props);

    if (!public_id) {
      this.public_id = idGenerator();
    } else {
      this.public_id = public_id;
    }
  }
}
