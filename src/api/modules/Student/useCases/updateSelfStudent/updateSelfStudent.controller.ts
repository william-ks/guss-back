import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { UpdateSelfStudentService } from "./updateSelfStudent.service";
import { TUpdateSelfStudentBody } from "./index";
import { Student } from "../../model/Student";

class UpdateSelfStudentController {
	constructor(private service: UpdateSelfStudentService) {}

	async handle(req: FQ<{ Body: TUpdateSelfStudentBody }>, reply: FY) {
		const { name, birthday, cpf, email, phone, password } = req.body;

		await this.service.execute({
			name,
			birthday,
			cpf,
			email,
			phone,
			password,
			student: req.student as Student,
		});

		return reply.status(204).send();
	}
}

export { UpdateSelfStudentController };
