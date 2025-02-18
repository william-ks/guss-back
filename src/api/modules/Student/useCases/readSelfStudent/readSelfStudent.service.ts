import { IReadSelfStudentDTO } from "./entities/readSelfStudent.DTO";
import { IStudentRepository } from "../../repository/IStudentRepository";

class ReadSelfStudentService {
	constructor(private studentRepository: IStudentRepository) {}

	async execute(props: IReadSelfStudentDTO) {
		const { id, description, password, isDeleted, isActive, ...student } =
			props.student;

		return props.student;
	}
}

export { ReadSelfStudentService };
