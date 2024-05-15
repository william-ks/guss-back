import { randomUUID } from "crypto";

export class Feature {
  public readonly id: string;
  public title: string;
  public code: string;

  constructor(props: Omit<Feature, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    } else {
      this.id = id;
    }
  }
}
