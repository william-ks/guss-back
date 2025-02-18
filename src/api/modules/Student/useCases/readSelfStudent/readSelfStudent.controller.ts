import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadSelfStudentService } from "./readSelfStudent.service";
import { Student } from "../../model/Student";

class ReadSelfStudentController {
	constructor(private service: ReadSelfStudentService) {}

	async handle(req: FQ, reply: FY) {
		const student = req.student;

		const data = await this.service.execute({
			student: student as Student,
		});

		return reply.send(data);
	}
}

export { ReadSelfStudentController };
