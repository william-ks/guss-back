import { IReadOneScheduleDTO } from "./entities/readOneSchedule.DTO";
import { IScheduleRepository } from "../../repository/IScheduleRepository";

class ReadOneScheduleService {
	constructor(private scheduleRepository: IScheduleRepository) {}

	async execute(props: IReadOneScheduleDTO) {}
}

export { ReadOneScheduleService };
