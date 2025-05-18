import { IToggleStudentActiveDTO } from "./entities/toggleStudentActive.DTO";
import { IClassroomRepository } from "../../repository/IClassroomRepository";

class ToggleStudentActiveService {
	constructor(private classroomRepository: IClassroomRepository) {}

	async execute(props: IToggleStudentActiveDTO) {}
}

export { ToggleStudentActiveService };
