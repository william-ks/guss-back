import { ILoginStudentDTO } from "./entities/loginStudent.DTO";
import { IStudentRepository } from "../../repository/IStudentRepository";
import { IPasswordProvider } from "../../../../providers/PasswordProvider/IPasswordProvider";
import { ITokenProvider } from "../../../../providers/TokenProvider/ITokenProvider";

class LoginStudentService {
	constructor(
		private studentRepository: IStudentRepository,
		private handlePass: IPasswordProvider,
		private handleToken: ITokenProvider,
	) {}

	async execute(props: ILoginStudentDTO) {
		const { email, password } = props;

		const student = await this.studentRepository.findUniqueBy({
			key: "email",
			value: email,
		});

		if (!student) {
			throw {
				code: 404,
				message: "E-mail or password are invalid.",
			};
		}

		if (!student.isActive) {
			throw {
				code: 401,
				message: "Account is inactive, please talk with adm.",
			};
		}

		const isValidPass = await this.handlePass.validate(
			password,
			student.password,
		);

		if (!isValidPass) {
			throw {
				code: 400,
				message: "E-mail or password are invalid.",
			};
		}

		const token = this.handleToken.createToken({
			publicId: student.publicId,
		});

		return {
			user: {
				id: student.publicId,
				name: student.name,
				photo: student.photo,
				email: student.email,
				primaryColor: student.primaryColor,
				grayColor: student.grayColor,
				theme: student.theme,
			},
			token,
		};
	}
}

export { LoginStudentService };
