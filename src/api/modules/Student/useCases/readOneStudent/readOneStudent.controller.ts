import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadOneStudentService } from "./readOneStudent.service";
import { TReadOneStudentParams } from "./index";

class ReadOneStudentController {
	constructor(private service: ReadOneStudentService) {}

	async handle(req: FQ<{ Params: TReadOneStudentParams }>, reply: FY) {
		const { id } = req.params;

		const data = await this.service.execute({ id });

		return reply.send(data);
	}
}

export { ReadOneStudentController };
