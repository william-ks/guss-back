import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { CreateScheduleService } from "./createSchedule.service";
import { TCreateScheduleBody } from "./entities/createSchedule.schema";
import { prisma } from "../../../../../config/prisma";
import { nanoid } from "nanoid";

class CreateScheduleController {
	constructor(private service: CreateScheduleService) {}

	async handle(req: FQ<{ Body: TCreateScheduleBody }>, reply: FY) {
		const { name, description, isDefault } = req.body;
		// TODO: Implement validation and logical
		const alreadyExists = await prisma.schedule.findFirst({
			where: {
				name,
				isDeleted: false,
			},
		});

		if (alreadyExists) {
			throw {
				code: 400,
				message: "Schedule already exists",
			};
		}

		if (isDefault !== true && isDefault !== false) {
			throw {
				code: 400,
				message: "isDefault must be a boolean",
			};
		}

		const newest = await prisma.schedule.create({
			data: {
				publicId: nanoid(),
				name,
				description,
				isDefault: isDefault || false,
			},
		});

		const data = {
			id: newest.publicId,
			name: newest.name,

			isDefault: newest.isDefault,
		};

		return reply.code(201).send(data);
	}
}

export { CreateScheduleController };
