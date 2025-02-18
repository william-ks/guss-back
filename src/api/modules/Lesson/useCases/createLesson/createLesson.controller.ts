import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { prisma } from "../../../../../config/prisma";
import { CreateLessonService } from "./createLesson.service";
import { TCreateLessonBody } from "./entities/createLesson.schema";

class CreateLessonController {
	constructor(private service: CreateLessonService) {}

	async handle(req: FQ<{ Body: TCreateLessonBody }>, reply: FY) {
		const { description, endAt, level, name, order, scheduleId, startAt } =
			req.body;

		const schedule = await prisma.schedule.findUnique({
			where: { publicId: scheduleId, isActive: true },
		});

		if (!schedule) {
			throw {
				code: 404,
				message: "Schedule not found",
			};
		}

		await prisma.lesson.create({
			data: {
				name,
				order: order || null,
				description,
				startAt: startAt || null,
				endAt: endAt || null,
				level,
				scheduleId: schedule.id,
			},
		});

		return reply.code(201).send();
	}
}

export { CreateLessonController };
