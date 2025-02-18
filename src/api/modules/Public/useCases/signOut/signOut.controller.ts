import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";

class SignOutController {
	constructor() {}

	async handle(req: FQ, reply: FY) {
		return reply
			.clearCookie("access_token", { path: "/api" })
			.status(204)
			.send();
	}
}

export { SignOutController };
