import { ScheduleRepository } from "../../repository/ScheduleRepository";
import { ReadAllSchedulesController } from "./readAllSchedules.controller";
import { ReadAllSchedulesService } from "./readAllSchedules.service";
import { readAllSchedulesSchema } from "./entities/readAllSchedules.schema";

const scheduleRepository = new ScheduleRepository();
const readAllSchedulesService = new ReadAllSchedulesService(scheduleRepository);
const readAllSchedulesController = new ReadAllSchedulesController(
	readAllSchedulesService,
);

export { readAllSchedulesController, readAllSchedulesSchema };
