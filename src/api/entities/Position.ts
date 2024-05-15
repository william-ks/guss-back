const { randomUUID: uuid } = require("crypto");

export class Position {
  public readonly id: string;
  public title: string;
  public sector_id: string;

  constructor(props: Omit<Position, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
