import { ScheduleRepository } from "../../repository/ScheduleRepository";
import { CreateScheduleController } from "./createSchedule.controller";
import { CreateScheduleService } from "./createSchedule.service";
import { createScheduleSchema, TCreateScheduleBody } from "./entities/createSchedule.schema";

const scheduleRepository = new ScheduleRepository();
const createScheduleService = new CreateScheduleService(scheduleRepository);
const createScheduleController = new CreateScheduleController(createScheduleService);

export { createScheduleController, createScheduleSchema, TCreateScheduleBody };