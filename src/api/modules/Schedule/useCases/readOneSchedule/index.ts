import { ScheduleRepository } from "../../repository/ScheduleRepository";
import { ReadOneScheduleController } from "./readOneSchedule.controller";
import { ReadOneScheduleService } from "./readOneSchedule.service";
import {
	readOneScheduleSchema,
	TReadOneScheduleParams,
} from "./entities/readOneSchedule.schema";

const scheduleRepository = new ScheduleRepository();
const readOneScheduleService = new ReadOneScheduleService(scheduleRepository);
const readOneScheduleController = new ReadOneScheduleController(
	readOneScheduleService,
);

export {
	readOneScheduleController,
	readOneScheduleSchema,
	TReadOneScheduleParams,
};
