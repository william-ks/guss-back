import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadOneScheduleService } from "./readOneSchedule.service";
import { TReadOneScheduleParams } from "./index";
import { prisma } from "../../../../../config/prisma";

class ReadOneScheduleController {
	constructor(private service: ReadOneScheduleService) {}

	async handle(req: FQ<{ Params: TReadOneScheduleParams }>, reply: FY) {
		const { id: publicId } = req.params;

		if (!publicId) {
			throw {
				code: 400,
				message: "publicId is required",
			};
		}

		const schedule = await prisma.schedule.findFirst({
			where: { publicId: publicId, isDeleted: false },
			include: {
				lessons: {
					orderBy: { order: "asc" },
					where: { isDeleted: false, isDeleted: false },
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
