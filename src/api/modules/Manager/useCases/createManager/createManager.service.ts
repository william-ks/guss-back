import { ICreateManagerDTO } from "./entities/createManager.DTO";
import { IManagerRepository } from "../../repository/IManagerRepository";
import { IPasswordProvider } from "../../../../providers/PasswordProvider/IPasswordProvider";
import { IRoleRepository } from "../../../Role/repository/IRoleRepository";
import { IPermissionRepository } from "../../../Permission/repository/IPermissionRepository";
import { Manager } from "../../model/Manager";

class CreateManagerService {
	constructor(
		private readonly managerRepository: IManagerRepository,
		private readonly handlePass: IPasswordProvider,
		private readonly roleRepository: IRoleRepository,
		private readonly permissionRepository: IPermissionRepository,
	) {}

	async execute(props: ICreateManagerDTO) {
		const emailAlreadyExists = await this.managerRepository.findUniqueBy({
			key: "email",
			value: props.email,
		});

		if (emailAlreadyExists) {
			throw {
				code: 400,
				message: "This e-mail already exists.",
			};
		}

		const cpfAlreadyExists = await this.managerRepository.findUniqueBy({
			key: "cpf",
			value: props.cpf,
		});

		if (cpfAlreadyExists) {
			throw {
				code: 400,
				message: "This cpf already exists .",
			};
		}

		const roleFound = await this.roleRepository.findUniqueById(
			props.roleId,
		);

		if (!roleFound) {
			throw {
				code: 404,
				message: "Role not found or not exists",
			};
		}

		const password = this.handlePass.generatePass(12);
		const hashPassword = await this.handlePass.hash(password);

		if (!props.photo) {
			props.photo = process.env.DEFAULT_PROFILE_IMG as string;
		}

		await this.managerRepository.save(
			new Manager({
				...props,
				password: hashPassword,
			}),
		);
	}
}

export { CreateManagerService };
