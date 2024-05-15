export interface ISendToken {
  email: string;
  token: string;
}

export interface IHandleEmail {
  sendToken(props: ISendToken): Promise<void>;
}
