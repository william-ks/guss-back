const { randomUUID: uuid } = require("crypto");

export class Sector {
  public readonly id: string;
  public title: string;

  constructor(props: Omit<Sector, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
