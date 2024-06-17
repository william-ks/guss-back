export interface IHandleToken {
  createToken(id: string, to: "gestor" | "student"): string;
  readToken(token: string, to: "gestor" | "student"): string;
}
