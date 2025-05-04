/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { ReadOneClassroomService } from "./readOneClassroom.service";
import { TReadOneClassroomParams } from "./index";
import { prisma } from "../../../../../config/prisma";

class ReadOneClassroomController {
	constructor(private service: ReadOneClassroomService) {}

	async handle(req: FQ<{ Params: TReadOneClassroomParams }>, reply: FY) {
		const id = req.params.id;

		const classroomRaw = await prisma.classroom.findFirst({
			where: {
				publicId: id,
			},
			include: {
				schedule: {
					include: {
						lessons: {
							where: {
								isDeleted: false,
							},
						},
					},
				},
				teacher: {
					include: {
						role: true,
					},
				},
				students: {
					include: {
						student: true,
					},
				},
			},
		});

		if (!classroomRaw) {
			throw {
				code: 404,
				message: "Classroom not found",
			};
		}

		// TODO: remove this ANY type
		const classroom: any = {
			id: classroomRaw.publicId,
			name: classroomRaw.name,
			status: classroomRaw.status,
			createdAt: new Intl.DateTimeFormat("pt-BR", {
				timeZone: "America/Sao_Paulo",
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}).format(new Date(classroomRaw.createdAt)),
		};

		if (classroomRaw.teacherId) {
			const teacherName = classroomRaw.teacher.name.split(" ");
			classroom.teacher = {
				id: classroomRaw.teacher.publicId,
				name: `${teacherName[0]} (${classroomRaw.teacher.role.title})`,
			};
		} else {
			classroom.teacher = null;
		}

		if (classroomRaw.scheduleId) {
			classroom.schedule = {
				id: classroomRaw.schedule.publicId,
				name: classroomRaw.schedule.name,
				description: classroomRaw.schedule.description,
				isDefault: classroomRaw.schedule.isDefault,
				lessons: classroomRaw.schedule.lessons.map((lesson) => ({
					id: lesson.id,
					name: lesson.name,
					description: lesson.description,
					order: lesson.order,
					level: lesson.level,
				})),
			};
		} else {
			classroom.schedule = null;
		}

		if (classroomRaw.students.length > 0) {
			classroom.students = classroomRaw.students.map((student) => ({
				id: student.student.publicId,
				name: student.student.name,
				email: student.student.email,
				isActive: student.student.isActive,
				absences: student.absences,
				presences: student.presences,
				enrollmentDate: new Intl.DateTimeFormat("pt-BR", {
					timeZone: "America/Sao_Paulo",
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				}).format(new Date(student.enrollmentDate)),
			}));
		} else {
			classroom.students = [];
		}

		return reply.status(200).send(classroom);
	}
}

export { ReadOneClassroomController };
