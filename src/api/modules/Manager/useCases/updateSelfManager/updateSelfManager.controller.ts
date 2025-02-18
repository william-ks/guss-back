import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { UpdateSelfManagerService } from "./updateSelfManager.service";
import { TUpdateSelfManagerBody } from "./entities/updateSelfManager.schema";

class UpdateSelfManagerController {
	constructor(private service: UpdateSelfManagerService) {}

	async handle(req: FQ<{ Body: TUpdateSelfManagerBody }>, reply: FY) {
		const manager = req.manager;
		const { address, birthday, cpf, email, name, password, phone, photo } =
			req.body;

		await this.service.execute({
			manager,
			address,
			name,
			email,
			photo,
			birthday,
			cpf,
			password,
			phone,
		});

		return reply.status(204).send();
	}
}

export { UpdateSelfManagerController };
