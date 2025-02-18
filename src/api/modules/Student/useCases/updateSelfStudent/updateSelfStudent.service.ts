import { IUpdateSelfStudentDTO } from "./entities/updateSelfStudent.DTO";
import { IStudentRepository } from "../../repository/IStudentRepository";
import { IPasswordProvider } from "../../../../providers/PasswordProvider/IPasswordProvider";

type TUpdatableFields = "email" | "cpf";

class UpdateSelfStudentService {
	constructor(
		private studentRepository: IStudentRepository,
		private handlePass: IPasswordProvider,
	) {}

	async updatePassword(id: number, password: string) {
		if (password.length < 8) {
			throw {
				code: 400,
				message: "Invalid Password",
			};
		}

		const hash = await this.handlePass.hash(password);

		await this.studentRepository.update({
			id,
			password: hash,
		});
	}

	async execute(props: IUpdateSelfStudentDTO) {
		const { student, password, ...preDataToUpdate } = props;

		if (password) {
			return await this.updatePassword(student.id, password);
		}

		const fieldsToUpdate = Object.keys(preDataToUpdate).filter((key) => {
			return (
				preDataToUpdate[key] !== null &&
				preDataToUpdate[key] !== undefined
			);
		});

		if (fieldsToUpdate.length <= 0) {
			throw {
				code: 400,
				message:
					"There is not enough data to update the current manager's information.",
			};
		}

		const checks: {
			key: TUpdatableFields;
			value: string | undefined;
			message1: string;
			message2: string;
		}[] = [
			{
				key: "email",
				value: preDataToUpdate.email,
				message1: "Already exists a manager with this E-mail.",
				message2: "This field can't be null",
			},
			{
				key: "cpf",
				value: preDataToUpdate.cpf,
				message1: "Already exists a manager with this CPF.",
				message2: "This field can't be null",
			},
		];

		for (const check of checks) {
			if (check.value) {
				const alreadyExists = await this.studentRepository.findAnother({
					id: student.id,
					key: check.key,
					value: check.value,
				});

				if (alreadyExists) {
					throw {
						code: 400,
						message: check.message1,
					};
				}
			} else if (check.value === "") {
				throw {
					code: 400,
					message: check.message2,
				};
			}
		}

		const dataToUpdate = {};

		for (const field of fieldsToUpdate) {
			dataToUpdate[field] = preDataToUpdate[field];
		}

		await this.studentRepository.update({
			id: student.id,
			...dataToUpdate,
		});
	}
}

export { UpdateSelfStudentService };
