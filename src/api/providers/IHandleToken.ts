export interface IHandleToken {
  createToken(id: string): string;
  readToken(token: string): string;
}
