import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadAllStudentsService } from "./readAllStudents.service";

class ReadAllStudentsController {
	constructor(private service: ReadAllStudentsService) {}

	async handle(req: FQ, reply: FY) {
		const data = await this.service.execute();

		return reply.send(data);
	}
}

export { ReadAllStudentsController };
