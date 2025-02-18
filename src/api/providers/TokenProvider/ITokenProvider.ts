export interface ITokenProvider {
	createToken(props: ICreateToken): string;
	readToken(token: string): IReadToken;
}

export interface ICreateToken {
	publicId: string;
	payload?: {
		userAgent?: string;
		clientIp?: string;
	};
}

export interface IReadToken {
	sub: string;
	ext: number;
	iat: number;
	userAgent?: string;
	clientIp?: string;
}
