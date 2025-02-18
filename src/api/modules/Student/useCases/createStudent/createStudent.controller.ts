import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { CreateStudentService } from "./createStudent.service";
import { TCreateStudentBody } from "./entities/createStudent.schema";

class CreateStudentController {
	constructor(private service: CreateStudentService) {}

	async handle(req: FQ<{ Body: TCreateStudentBody }>, reply: FY) {
		const { birthday, cpf, description, email, name, password, phone } =
			req.body;

		await this.service.execute({
			birthday,
			cpf,
			description,
			email,
			name,
			password,
			phone,
		});

		return reply.status(201).send();
	}
}

export { CreateStudentController };
