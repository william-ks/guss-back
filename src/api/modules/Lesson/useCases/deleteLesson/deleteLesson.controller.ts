import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { DeleteLessonService } from "./deleteLesson.service";
import { TDeleteLessonParams } from "./index";
import { prisma } from "../../../../../config/prisma";

class DeleteLessonController {
	constructor(private service: DeleteLessonService) {}

	async handle(req: FQ<{ Params: TDeleteLessonParams }>, reply: FY) {
		const { id } = req.params;

		const lessonExists = await prisma.lesson.findFirst({
			where: { id: +id },
		});

		if (!lessonExists) {
			throw {
				code: 404,
				message: "Lesson not found",
			};
		}

		if (lessonExists.isDeleted) {
			throw {
				code: 400,
				message: "Lesson already deleted",
			};
		}

		// verifica se o shedule está atribuido a algum aluno
		const scheduleExists = await prisma.classroom.findFirst({
			where: {
				scheduleId: 1,
			},
		});

		if (scheduleExists) {
			await prisma.lesson.update({
				where: { id: +id },
				data: { isDeleted: true },
			});
		} else {
			await prisma.lesson.delete({
				where: { id: +id },
			});
		}

		return reply.status(204).send();
	}
}

export { DeleteLessonController };
