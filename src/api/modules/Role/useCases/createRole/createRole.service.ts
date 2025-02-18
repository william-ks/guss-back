import { ICreateRoleDTO } from "./entities/createRole.DTO";
import { IRoleRepository } from "../../repository/IRoleRepository";

class CreateRoleService {
	constructor(private roleRepository: IRoleRepository) {}

	async execute(props: ICreateRoleDTO) {
		const alreadyExistsTitle = await this.roleRepository.findUniqueByTitle(
			props.title,
		);

		if (alreadyExistsTitle) {
			throw {
				code: 400,
				message: "Role with this title already exists",
			};
		}

		await this.roleRepository.save({
			title: props.title,
			points: props.points,
		});
	}
}

export { CreateRoleService };
