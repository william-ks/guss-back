import { IStudentRepository } from "../../repository/IStudentRepository";

class ReadAllStudentsService {
	constructor(private studentRepository: IStudentRepository) {}

	async execute() {
		const rawStudents = await this.studentRepository.listAll();

		const students = rawStudents.map((student) => {
			const { isDeleted, id, password, ...data } = student;

			return data;
		});

		return students;
	}
}

export { ReadAllStudentsService };
