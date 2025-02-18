import { ILoginManagerDTO } from "./entities/loginManager.DTO";
import { IManagerRepository } from "../../repository/IManagerRepository";
import { IPasswordProvider } from "../../../../providers/PasswordProvider/IPasswordProvider";
import { ITokenProvider } from "../../../../providers/TokenProvider/ITokenProvider";

class LoginManagerService {
	constructor(
		private readonly managerRepository: IManagerRepository,
		private readonly handlePass: IPasswordProvider,
		private readonly handleToken: ITokenProvider,
	) {}

	async execute(props: ILoginManagerDTO) {
		const { email, password } = props;

		const manager = await this.managerRepository.findUniqueBy({
			key: "email",
			value: email,
		});

		if (!manager) {
			throw {
				code: 404,
				message: "E-mail or password are invalid.",
			};
		}

		if (!manager.isActive) {
			throw {
				code: 401,
				message: "Account is inactive, please talk with adm.",
			};
		}

		const isValidPass = await this.handlePass.validate(
			password,
			manager.password,
		);

		if (!isValidPass) {
			throw {
				code: 400,
				message: "E-mail or password are invalid.",
			};
		}

		const token = this.handleToken.createToken({
			publicId: manager.publicId,
		});

		return {
			user: {
				id: manager.publicId,
				name: manager.name,
				photo: manager.photo,
				email: manager.email,
				role: {
					id: manager.role.id,
					title: manager.role.title,
					points: manager.role.points,
				},
				primaryColor: manager.primaryColor,
				grayColor: manager.grayColor,
				permissions: manager.permissions,
			},
			token,
		};
	}
}

export { LoginManagerService };
