import { IReadOneStudentDTO } from "./entities/readOneStudent.DTO";
import { IStudentRepository } from "../../repository/IStudentRepository";

class ReadOneStudentService {
	constructor(private studentRepository: IStudentRepository) {}

	async execute(props: IReadOneStudentDTO) {
		const student = await this.studentRepository.findUniqueBy({
			key: "publicId",
			value: props.id,
		});

		if (!student) {
			throw {
				code: 404,
				message: "Student not found.",
			};
		}

		const { id, password, isDeleted, ...data } = student;

		return data;
	}
}

export { ReadOneStudentService };
