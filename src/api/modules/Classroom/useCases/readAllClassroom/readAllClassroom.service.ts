import { IReadAllClassroomDTO } from "./entities/readAllClassroom.DTO";
import { IClassroomRepository } from "../../repository/IClassroomRepository";

class ReadAllClassroomService {
	constructor(private classroomRepository: IClassroomRepository) {}

	async execute(props: IReadAllClassroomDTO) {}
}

export { ReadAllClassroomService };
