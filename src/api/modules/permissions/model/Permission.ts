export class Permission {
  public readonly id?: number;
  public name: string;
  public code: string;

  constructor(props: Permission) {
    Object.assign(this, props);
  }
}
