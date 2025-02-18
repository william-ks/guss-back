import { ICreateStudentDTO } from "./entities/createStudent.DTO";
import { IStudentRepository } from "../../repository/IStudentRepository";
import { IPasswordProvider } from "../../../../providers/PasswordProvider/IPasswordProvider";
import { Student } from "../../model/Student";

class CreateStudentService {
	constructor(
		private studentRepository: IStudentRepository,
		private handlePass: IPasswordProvider,
	) {}

	async execute(props: ICreateStudentDTO) {
		const { email, cpf, password } = props;

		const emailAlreadyExists = await this.studentRepository.findUniqueBy({
			key: "email",
			value: email,
		});

		const cpfAlreadyExists = await this.studentRepository.findUniqueBy({
			key: "cpf",
			value: cpf,
		});

		if (emailAlreadyExists || cpfAlreadyExists) {
			throw {
				code: 400,
				message: "Email or CPF already exists",
			};
		}

		const hashPass = await this.handlePass.hash(
			password ?? this.handlePass.generatePass(10),
		);

		await this.studentRepository.save(
			new Student({
				name: props.name,
				email: props.email,
				cpf: props.cpf,
				password: hashPass,
			}),
		);
	}
}

export { CreateStudentService };
