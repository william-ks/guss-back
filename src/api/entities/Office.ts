import { randomUUID } from "crypto";

export class Office {
  public readonly id: string;
  public title: string;

  constructor(props: Omit<Office, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    } else {
      this.id = id;
    }
  }
}
