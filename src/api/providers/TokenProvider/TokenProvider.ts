import jwt from "jsonwebtoken";
import { ICreateToken, IReadToken, ITokenProvider } from "./ITokenProvider";

export class TokenProvider implements ITokenProvider {
	private jwtSecret: string;
	private jwtExpiration: string;

	constructor(
		jwtSecret: string = process.env.JWT_SECRET as string,
		jwtExpiration: string = process.env.JWT_TOKEN_EXPIRATION as string,
	) {
		this.jwtSecret = jwtSecret;
		this.jwtExpiration = jwtExpiration;
	}

	createToken(props: ICreateToken): string {
		const { publicId } = props;

		const token = jwt.sign({ ...props.payload }, this.jwtSecret, {
			subject: publicId,
			expiresIn: this.jwtExpiration,
		});

		return token;
	}

	readToken(token: string): IReadToken {
		const data = jwt.verify(token, this.jwtSecret) as IReadToken;

		return data;
	}
}
