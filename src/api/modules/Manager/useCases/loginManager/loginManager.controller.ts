import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { LoginManagerService } from "./loginManager.service";
import { TLoginManagerBody } from "./entities/loginManager.schema";

class LoginManagerController {
	constructor(private service: LoginManagerService) {}

	async handle(req: FQ<{ Body: TLoginManagerBody }>, reply: FY) {
		const { email, password } = req.body;

		const { token, ...data } = await this.service.execute({
			email,
			password,
		});

		return reply
			.setCookie("access_token", token, {
				path: "/api",
				httpOnly: true,
				secure: process.env.NODE_ENV !== "DEVELOPMENT", // Required HTTPS in PROD
				sameSite: "strict",
				maxAge: 28800, // 8h
			})
			.send(data);
	}
}

export { LoginManagerController };
