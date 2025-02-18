import { IManagerRepository } from "../../repository/IManagerRepository";

class ReadAllManagersService {
	constructor(private managerRepository: IManagerRepository) {}

	async execute() {
		const managersRaw = await this.managerRepository.listAll();

		const managers = managersRaw.map((el) => {
			const { password, ...ret } = el;

			return ret;
		});

		return managers;
	}
}

export { ReadAllManagersService };
