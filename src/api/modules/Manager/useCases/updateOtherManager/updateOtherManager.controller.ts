import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { UpdateOtherManagerService } from "./updateOtherManager.service";
import {
	TUpdateOtherManagerBody as TB,
	TUpdateOtherManagerParams as TP,
} from "./index";
import { Manager } from "../../model/Manager";

class UpdateOtherManagerController {
	constructor(private service: UpdateOtherManagerService) {}

	async handle(req: FQ<{ Body: TB; Params: TP }>, reply: FY) {
		const { id } = req.params;
		const { permissions, roleId } = req.body;

		await this.service.execute({
			permissions,
			roleId,
			idToUpdate: id,
			actualManager: req.manager as Manager,
		});

		return reply.status(204).send();
	}
}

export { UpdateOtherManagerController };
