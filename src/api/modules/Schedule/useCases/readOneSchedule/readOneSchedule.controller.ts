import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadOneScheduleService } from "./readOneSchedule.service";
import { TReadOneScheduleParams } from "./index";
import { prisma } from "../../../../../config/prisma";

class ReadOneScheduleController {
	constructor(private service: ReadOneScheduleService) {}

	async handle(req: FQ<{ Params: TReadOneScheduleParams }>, reply: FY) {
		const { id } = req.params;

		if (!id) {
			throw {
				code: 400,
				message: "id is required",
			};
		}

		if (isNaN(Number(id))) {
			throw {
				code: 400,
				message: "id must be a number",
			};
		}

		const schedule = await prisma.schedule.findFirst({
			where: { id: +id, isDeleted: false },
			include: {
				lessons: {
					orderBy: { order: "asc" },
					where: { isDeleted: false, isActive: true },
				},
			},
		});

		if (!schedule) {
			throw {
				code: 404,
				message: "Schedule not found",
			};
		}

		return reply.send(schedule);
	}
}

export { ReadOneScheduleController };
