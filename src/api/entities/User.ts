import { randomUUID } from "crypto";
import { Feature } from "./Feature";

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public photo?: string;
  public officeId: string;
  public started_at: Date;
  public is_active: boolean;

  public UserFeatures?: Feature[];

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    } else {
      this.id = id;
    }
  }
}
