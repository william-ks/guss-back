import { IReadOneClassroomDTO } from "./entities/readOneClassroom.DTO";
import { IClassroomRepository } from "../../repository/IClassroomRepository";

class ReadOneClassroomService {
	constructor(private classroomRepository: IClassroomRepository) {}

	async execute(props: IReadOneClassroomDTO) {}
}

export { ReadOneClassroomService };
