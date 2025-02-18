import { IUpdateSelfManagerDTO } from "./entities/updateSelfManager.DTO";
import { IManagerRepository } from "../../repository/IManagerRepository";
import { IPasswordProvider } from "../../../../providers/PasswordProvider/IPasswordProvider";

type TUpdatableFields = "email" | "cpf";

class UpdateSelfManagerService {
	constructor(
		private managerRepository: IManagerRepository,
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

		await this.managerRepository.update({
			id,
			password: hash,
		});
	}

	async execute(props: IUpdateSelfManagerDTO) {
		const { manager, password, ...preDataToUpdate } = props;

		if (password) {
			return await this.updatePassword(manager.id, password);
		}

		const fieldsToUpdate = Object.keys(preDataToUpdate).filter((key) => {
			if (preDataToUpdate[key]) {
				return key;
			}
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
			message: string;
		}[] = [
			{
				key: "email",
				value: preDataToUpdate.email,
				message: "Already exists a manager with this E-mail.",
			},
			{
				key: "cpf",
				value: preDataToUpdate.cpf,
				message: "Already exists a manager with this CPF.",
			},
		];

		for (const check of checks) {
			if (check.value) {
				const alreadyExists = await this.managerRepository.findAnother({
					id: manager.id,
					key: check.key,
					value: check.value,
				});

				if (alreadyExists) {
					throw {
						code: 400,
						message: check.message,
					};
				}
			}
		}

		const dataToUpdate = {};

		for (const field of fieldsToUpdate) {
			dataToUpdate[field] = preDataToUpdate[field];
		}

		await this.managerRepository.update({
			id: manager.id,
			...dataToUpdate,
		});
	}
}

export { UpdateSelfManagerService };
