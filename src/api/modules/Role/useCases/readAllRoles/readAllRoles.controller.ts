import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadAllRolesService } from "./readAllRoles.service";

class ReadAllRolesController {
	constructor(private service: ReadAllRolesService) {}

	async handle(req: FQ, reply: FY) {
		const roles = await this.service.execute();

		return reply.send(roles);
	}
}

export { ReadAllRolesController };
