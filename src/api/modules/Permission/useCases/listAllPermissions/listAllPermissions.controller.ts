import { FastifyReply as FY } from "fastify";
import { IPermissionRepository } from "../../repository/IPermissionRepository";

class ListAllPermissionsController {
	constructor(
		private readonly permissionsRepository: IPermissionRepository,
	) {}

	async handle(req, reply: FY) {
		const permissions = await this.permissionsRepository.listAll();

		return reply.send(permissions);
	}
}

export { ListAllPermissionsController };
