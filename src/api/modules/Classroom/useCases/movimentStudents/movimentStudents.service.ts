import { IMovimentStudentsDTO } from "./entities/movimentStudents.DTO";
import { IClassroomRepository } from "../../repository/IClassroomRepository";

class MovimentStudentsService {
	constructor(private classroomRepository: IClassroomRepository) {}

	async execute(props: IMovimentStudentsDTO) {}
}

export { MovimentStudentsService };
