import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadSelfManagerService } from "./readSelfManager.service";

class ReadSelfManagerController {
	constructor(private service: ReadSelfManagerService) {}

	async handle(req: FQ, reply: FY) {
		const manager = await this.service.execute(req.manager);

		return reply.send(manager);
	}
}

export { ReadSelfManagerController };
