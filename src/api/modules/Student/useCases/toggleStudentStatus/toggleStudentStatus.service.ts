import { IToggleStudentStatusDTO } from "./entities/toggleStudentStatus.DTO";
import { IStudentRepository } from "../../repository/IStudentRepository";

class ToggleStudentStatusService {
	constructor(private studentRepository: IStudentRepository) {}

	async execute(props: IToggleStudentStatusDTO) {
		const { studentId, status } = props;

		const student = await this.studentRepository.findUniqueBy({
			key: "publicId",
			value: studentId,
		});

		if (!student) {
			throw {
				code: 404,
				message: "Student not found.",
			};
		}

		if (student.isActive === status) {
			return;
		}

		await this.studentRepository.update({
			id: student.id,
			isActive: status,
		});
	}
}

export { ToggleStudentStatusService };
