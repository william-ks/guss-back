import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ToggleStudentStatusService } from "./toggleStudentStatus.service";
import { TToggleStudentStatusBody, TToggleStudentStatusParams } from "./index";

class ToggleStudentStatusController {
	constructor(private service: ToggleStudentStatusService) {}

	async handle(
		req: FQ<{
			Body: TToggleStudentStatusBody;
			Params: TToggleStudentStatusParams;
		}>,
		reply: FY,
	) {
		const { id: studentId } = req.params;
		const { status } = req.body;

		await this.service.execute({ status, studentId });

		return reply.status(204).send();
	}
}

export { ToggleStudentStatusController };
