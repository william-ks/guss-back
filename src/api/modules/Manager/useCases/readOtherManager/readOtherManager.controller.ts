import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadOtherManagerService } from "./readOtherManager.service";
import { TReadOtherManagerParams } from "./entities/readOtherManager.schema";

class ReadOtherManagerController {
	constructor(private service: ReadOtherManagerService) {}

	async handle(req: FQ<{ Params: TReadOtherManagerParams }>, reply: FY) {
		const { id } = req.params;

		const manager = await this.service.execute({
			publicId: id,
		});

		return reply.send(manager);
	}
}

export { ReadOtherManagerController };
