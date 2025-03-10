import { ICreateScheduleDTO } from "./entities/createSchedule.DTO";
import { IScheduleRepository } from "../../repository/IScheduleRepository";

class CreateScheduleService {
	constructor(private scheduleRepository: IScheduleRepository) {}

	async execute(props: ICreateScheduleDTO) {}
}

export { CreateScheduleService };
