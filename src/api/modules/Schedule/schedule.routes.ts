import { FastifyPluginOptions as FO, FastifyRequest as FQ } from "fastify";
import { FastifyTypedInstance as FI } from "../../../@types/FastifyTypeInterface";
import {
	createScheduleController,
	createScheduleSchema,
	TCreateScheduleBody,
} from "./useCases/createSchedule";
import {
	readAllSchedulesController,
	readAllSchedulesSchema,
} from "./useCases/readAllSchedules";
import {
	readOneScheduleController,
	readOneScheduleSchema,
	TReadOneScheduleParams,
} from "./useCases/readOneSchedule";

const scheduleRouter = async (fastify: FI, options: FO) => {
	fastify.post<{ Body: TCreateScheduleBody }>("/create", {
		schema: createScheduleSchema,
		handler: (req, res) => {
			return createScheduleController.handle(req, res);
		},
	});

	fastify.get("/read/all", {
		schema: readAllSchedulesSchema,
		handler: (req, res) => {
			return readAllSchedulesController.handle(req, res);
		},
	});

	fastify.get<{ Params: TReadOneScheduleParams }>("/read/one/:id", {
		schema: readOneScheduleSchema,
		handler: (req, res) => {
			return readOneScheduleController.handle(req, res);
		},
	});
};

export { scheduleRouter };
