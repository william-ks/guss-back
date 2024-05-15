import { randomUUID } from "crypto";

export class UserFeature {
  public readonly id: string;
  public user_id: string;
  public feature_id: string;

  constructor(props: Omit<UserFeature, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
