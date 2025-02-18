import { IRoleRepository } from "../../repository/IRoleRepository";

class ReadAllRolesService {
	constructor(private roleRepository: IRoleRepository) {}

	async execute() {
		const rolesRaw = await this.roleRepository.listAll();

		const roles = rolesRaw.map((el) => {
			return { id: el.id, title: el.title, points: el.points };
		});

		return roles;
	}
}

export { ReadAllRolesService };
