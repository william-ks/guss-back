import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { CreateRoleService } from "./createRole.service";
import { TCreateRoleBody } from "./entities/createRole.schema";

class CreateRoleController {
	constructor(private service: CreateRoleService) {}

	async handle(req: FQ<{ Body: TCreateRoleBody }>, reply: FY) {
		const { points, title } = req.body;

		await this.service.execute({ title, points });
	}
}

export { CreateRoleController };
