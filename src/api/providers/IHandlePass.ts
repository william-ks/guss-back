export interface IIsInvalid {
  hash: string;
  pass: string;
}

export interface IHandlePass {
  encrypt(pass: string): Promise<string>;
  isInValid({ hash, pass }: IIsInvalid): Promise<boolean>;
  generatePass(length?: number): string;
}
