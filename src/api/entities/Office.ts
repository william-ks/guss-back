export class Office {
  public readonly id?: number;
  public title: string;

  constructor(props: Office) {
    Object.assign(this, props);
  }
}
