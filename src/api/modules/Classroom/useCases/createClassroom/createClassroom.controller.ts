import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { CreateClassroomService } from "./createClassroom.service";
import { TCreateClassroomBody } from "./entities/createClassroom.schema";
import { prisma } from "../../../../../config/prisma";
import { Classroom } from "../../model/Classroom";
import { nanoid } from "nanoid";

interface INewClassroom {
	name: string;
	scheduleId?: number;
	teacherId?: number;
}

class CreateClassroomController {
	constructor(private service: CreateClassroomService) {}

	async handle(req: FQ<{ Body: TCreateClassroomBody }>, reply: FY) {
		const { scheduleId, name, studentsIds, teacherId } = req.body;

		const newClassroom: INewClassroom = {
			name,
		};

		if (scheduleId) {
			const schedule = await prisma.schedule.findFirst({
				where: {
					publicId: scheduleId,
					isDeleted: false,
				},
			});

			if (!schedule) {
				throw {
					code: 404,
					message: "Schedule not found",
				};
			}

			newClassroom.scheduleId = schedule.id;
		}

		if (teacherId) {
			const teacher = await prisma.manager.findFirst({
				where: {
					id: teacherId,
					isDeleted: false,
				},
			});

			if (!teacher) {
				throw {
					code: 404,
					message: "Teacher not found",
				};
			}
		}

		const students = [];
		if (studentsIds.length > 0) {
			for (const studentId of studentsIds) {
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

				students.push(student);
			}
		}

		let classroom: Classroom | null = null;
		await prisma.$transaction(async (tx) => {
			classroom = await tx.classroom.create({
				data: {
					publicId: nanoid(),
					status: "Not Started",
					name: newClassroom.name,
					scheduleId: newClassroom.scheduleId ?? null,
					teacherId: newClassroom.teacherId ?? null,
				},
			});

			if (students.length > 0) {
				for (const student of students) {
					await tx.classStudent.create({
						data: {
							enrollmentDate: new Date(),
							classroomId: classroom.id,
							studentId: student.id,
						},
					});
				}
			}
		});

		return reply.status(201).send(classroom);
	}
}

export { CreateClassroomController };
