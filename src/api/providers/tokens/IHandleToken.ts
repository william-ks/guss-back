export interface IHandleToken {
  createToken(props: ICreateToken): string;
  readToken(token: string, to: "gestor" | "student"): string;
}

export interface ICreateToken {
  public_id: string;
  to: "gestor" | "student";
}
