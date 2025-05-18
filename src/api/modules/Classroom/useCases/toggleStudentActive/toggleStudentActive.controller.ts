import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ToggleStudentActiveService } from "./toggleStudentActive.service";
import { TToggleStudentActiveParams } from "./index";
import { prisma } from "../../../../../config/prisma";
import { aw } from "vitest/dist/chunks/reporters.D7Jzd9GS";

class ToggleStudentActiveController {
	constructor(private service: ToggleStudentActiveService) {}

	async handle(req: FQ<{ Params: TToggleStudentActiveParams }>, reply: FY) {
		const { classroomId, studentId } = req.params;

		if (!classroomId || !studentId) {
			throw {
				code: 400,
				message: "Missing classroomId or studentId",
			};
		}

		const classroom = await prisma.classroom.findFirst({
			where: {
				publicId: classroomId,
				isDeleted: false,
			},
			include: {
				students: {
					where: {
						isDeleted: false,
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

		const student = await prisma.student.findFirst({
			where: {
				publicId: studentId,
				isDeleted: false,
			},
		});

		if (!student) {
			throw {
				code: 404,
				message: "Student not found",
			};
		}

		if (!student.isActive) {
			throw {
				code: 400,
				message: "Student is disabled",
			};
		}

		const studentInClassroom = classroom.students.find((el) => {
			return el.studentId === student.id;
		});

		if (!studentInClassroom) {
			throw {
				code: 400,
				message: "Student not found in classroom",
			};
		}

		await prisma.classStudent.update({
			where: {
				id: studentInClassroom.id,
			},
			data: {
				isActive: !studentInClassroom.isActive,
			},
		});

		return reply.status(204).send();
	}
}

export { ToggleStudentActiveController };
