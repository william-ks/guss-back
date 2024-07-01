export class Feature {
  public readonly id?: number;
  public title: string;
  public code: string;

  constructor(props: Feature) {
    Object.assign(this, props);
  }
}
