import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadAllManagersService } from "./readAllManagers.service";

class ReadAllManagersController {
	constructor(private service: ReadAllManagersService) {}

	async handle(req: FQ, reply: FY) {
		const managers = await this.service.execute();

		return reply.send(managers);
	}
}

export { ReadAllManagersController };
