import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { UpdateColorsService } from "./updateColors.service";
import { TUpdateColorsBody } from "./index";
import { Manager } from "../../../Manager/model/Manager";
import { Student } from "../../../Student/model/Student";

class UpdateColorsController {
	constructor(private service: UpdateColorsService) {}

	async handle(req: FQ<{ Body: TUpdateColorsBody }>, reply: FY) {
		const { grayColor, primaryColor, theme } = req.body;
		const { manager, student } = req;

		await this.service.execute({
			primaryColor,
			grayColor,
			theme,
			manager: manager as Manager,
			student: student as Student,
		});

		return reply.status(204).send();
	}
}

export { UpdateColorsController };
