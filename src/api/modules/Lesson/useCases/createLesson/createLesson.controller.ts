import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { prisma } from "../../../../../config/prisma";
import { CreateLessonService } from "./createLesson.service";
import { TCreateLessonBody } from "./entities/createLesson.schema";

class CreateLessonController {
	constructor(private service: CreateLessonService) {}

	async handle(req: FQ<{ Body: TCreateLessonBody }>, reply: FY) {
		const { description, level, name, order, scheduleId } = req.body;

		const proficiencyLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];

		const schedule = await prisma.schedule.findUnique({
			where: { publicId: scheduleId, isActive: true },
		});

		if (!proficiencyLevels.includes(level)) {
			throw {
				code: 400,
				message: "Invalid level",
			};
		}

		if (!schedule) {
			throw {
				code: 404,
				message: "Schedule not found",
			};
		}

		const orderExists = await prisma.lesson.findFirst({
			where: {
				order,
				scheduleId: schedule.id,
				isActive: true,
			},
		});

		if (orderExists) {
			throw {
				code: 400,
				message: "Order number already exists",
			};
		}

		await prisma.lesson.create({
			data: {
				name,
				order: order || null,
				description,
				level,
				scheduleId: schedule.id,
			},
		});

		return reply.code(201).send();
	}
}

export { CreateLessonController };
