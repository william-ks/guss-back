import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ToggleManagerStatusService } from "./toggleManagerStatus.service";
import {
	TToggleManagerStatusBody,
	TToggleManagerStatusParams,
} from "./entities/toggleManagerStatus.schema";

class ToggleManagerStatusController {
	constructor(private service: ToggleManagerStatusService) {}

	async handle(
		req: FQ<{
			Body: TToggleManagerStatusBody;
			Params: TToggleManagerStatusParams;
		}>,
		reply: FY,
	) {
		const { status } = req.body;
		const { id: idToUpdate } = req.params;
		const { id: actualId } = req.manager;

		await this.service.execute({
			status,
			idToUpdate,
			actualId,
		});

		return reply.status(204).send();
	}
}

export { ToggleManagerStatusController };
