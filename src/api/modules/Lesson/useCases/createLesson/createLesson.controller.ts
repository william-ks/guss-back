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
			where: { publicId: scheduleId, isDeleted: false },
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
				isDeleted: false,
			},
		});

		if (orderExists) {
			// seleciona todos os lesson que tem tem o mesmo schedueId e order maior ou igual
			const lessons = await prisma.lesson.findMany({
				where: {
					scheduleId: schedule.id,
					order: { gte: order },
					isDeleted: false,
				},
			});

			// atualiza todos os lessons com order maior ou igual adicionando 1 ao order
			for (const lesson of lessons) {
				await prisma.lesson.update({
					where: { id: lesson.id },
					data: { order: lesson.order + 1 },
				});
			}
		}

		await prisma.lesson.create({
			data: {
				name,
				order,
				description,
				level,
				scheduleId: schedule.id,
			},
		});

		return reply.code(201).send();
	}
}

export { CreateLessonController };
