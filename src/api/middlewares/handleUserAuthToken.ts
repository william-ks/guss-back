import { FastifyReply, FastifyRequest } from "fastify";
import { TokenProvider } from "../providers/TokenProvider/TokenProvider";

const handleUserAuthToken = async (
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	const token = req.cookies["access_token"];
	const tokenProvider = new TokenProvider();

	try {
		if (!token) {
			throw new Error();
		}

		const tokenData = tokenProvider.readToken(token);

		if (tokenData.userAgent) {
			const userAgent = req.headers["user-agent"];

			if (userAgent !== tokenData.userAgent) {
				throw new Error();
			}
		}

		if (tokenData.clientIp) {
			const clientIp = req.ip;

			if (clientIp !== tokenData.clientIp) {
				throw new Error();
			}
		}

		req.user = { publicId: tokenData.sub };
	} catch (e) {
		throw {
			code: 403,
			message: "Please log in to continue..",
		};
	}
};

export { handleUserAuthToken };
