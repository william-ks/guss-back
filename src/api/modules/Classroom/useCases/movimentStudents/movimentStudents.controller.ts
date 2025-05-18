import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { MovimentStudentsService } from "./movimentStudents.service";
import { TMovimentStudentsBody } from "./index";
import { prisma } from "../../../../../config/prisma";

class MovimentStudentsController {
	constructor(private service: MovimentStudentsService) {}

	async handle(req: FQ<{ Body: TMovimentStudentsBody }>, reply: FY) {
		const { classroomId, studentsIds } = req.body;

		const classroom = await prisma.classroom.findFirst({
			where: {
				publicId: classroomId,
				isDeleted: false,
			},
			include: {
				students: {
					include: {
						student: true,
					},
				},
			},
		});

		if (!classroom) {
			throw {
				code: 404,
				message: "Classroom not found",
			};
		}

		if (classroom.finished) {
			throw {
				code: 400,
				message: "Classroom is finished",
			};
		}

		// verifica se os alunos existem e se ja estão em alguma turma
		const toAdd = [];
		const toRemove = [];
		for (const studentId of studentsIds) {
			const actualStudent = await prisma.student.findFirst({
				where: {
					publicId: studentId,
					isDeleted: false,
				},
				include: {
					classrooms: true,
				},
			});

			if (!actualStudent) {
				throw {
					code: 404,
					message: `Student ${studentId} not found`,
				};
			}

			const studentAlreadyInClassroom = actualStudent.classrooms.find(
				(el) => {
					return (
						el.classroomId === classroom.id &&
						el.isDeleted === false
					);
				},
			);

			if (studentAlreadyInClassroom) {
				toRemove.push(actualStudent.id);
			} else {
				toAdd.push(actualStudent.id);
			}
		}

		for (const student of toAdd) {
			await prisma.classStudent.create({
				data: {
					classroomId: classroom.id,
					studentId: student,
					enrollmentDate: new Date(),
				},
			});
		}

		for (const student of toRemove) {
			await prisma.classStudent.updateMany({
				where: {
					classroomId: classroom.id,
					studentId: student,
				},
				data: {
					isDeleted: true,
				},
			});
		}

		return reply.status(204).send();
	}
}

export { MovimentStudentsController };
