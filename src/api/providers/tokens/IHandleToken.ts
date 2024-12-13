export interface IHandleToken {
  createToken(props: ICreateToken): string;
  readToken(token: string, to: "manager" | "student"): string;
}

export interface ICreateToken {
  publicId: string;
  to: "manager" | "student";
}
