import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { CreateManagerService } from "./createManager.service";
import { TCreateManagerBody } from "./entities/createManager.schema";

class CreateManagerController {
	constructor(private service: CreateManagerService) {}

	async handle(req: FQ<{ Body: TCreateManagerBody }>, reply: FY) {
		const {
			name,
			email,
			photo,
			roleId,
			birthday,
			cpf,
			address,
			permissions,
			password,
			phone,
		} = req.body;

		await this.service.execute({
			name,
			email,
			photo,
			roleId,
			birthday,
			cpf,
			address,
			permissions,
			password,
			phone,
		});

		return reply.status(201).send();
	}
}

export { CreateManagerController };
