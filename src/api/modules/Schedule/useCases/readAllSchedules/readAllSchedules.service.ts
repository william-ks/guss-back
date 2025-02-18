import { IReadAllSchedulesDTO } from "./entities/readAllSchedules.DTO";
import { IScheduleRepository } from "../../repository/IScheduleRepository";

class ReadAllSchedulesService {
	constructor(private scheduleRepository: IScheduleRepository) {}

	async execute(props: IReadAllSchedulesDTO) {}
}

export { ReadAllSchedulesService };
