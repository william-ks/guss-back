export interface IHandleToken {
  createToken(props: ICreateToken): string;
  readToken(token: string, to: "manager" | "student"): string;
}

export interface ICreateToken {
  public_id: string;
  to: "manager" | "student";
}
