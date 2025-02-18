import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadAllSchedulesService } from "./readAllSchedules.service";
import { prisma } from "../../../../../config/prisma";

class ReadAllSchedulesController {
	constructor(private service: ReadAllSchedulesService) {}

	async handle(req: FQ, reply: FY) {
		const schedules = await prisma.schedule.findMany({
			where: {
				isActive: true,
			},
			include: {
				lessons: {
					orderBy: {
						order: "asc",
					},
				},
				homeworks: true,
			},
		});

		return reply.send(schedules);
	}
}

export { ReadAllSchedulesController };
