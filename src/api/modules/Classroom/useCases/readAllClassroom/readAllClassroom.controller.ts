import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadAllClassroomService } from "./readAllClassroom.service";
import { prisma } from "../../../../../config/prisma";

class ReadAllClassroomController {
	constructor(private service: ReadAllClassroomService) {}

	async handle(req: FQ, reply: FY) {
		const classrooms = await prisma.classroom.findMany({
			where: {
				isDeleted: false,
			},
			include: {
				teacher: true,
				schedule: true,
				students: {
					include: {
						student: true,
					},
				},
			},
		});

		return reply.status(200).send(classrooms);
	}
}

export { ReadAllClassroomController };
