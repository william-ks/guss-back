import { IToggleManagerStatusDTO } from "./entities/toggleManagerStatus.DTO";
import { IManagerRepository } from "../../repository/IManagerRepository";

class ToggleManagerStatusService {
	constructor(private managerRepository: IManagerRepository) {}

	async execute(props: IToggleManagerStatusDTO) {
		const { actualId, idToUpdate, status } = props;

		const manager = await this.managerRepository.findUniqueBy({
			key: "publicId",
			value: idToUpdate,
		});

		if (!manager) {
			throw {
				code: 404,
				message: "Manager not found.",
			};
		}

		if (actualId === manager.id) {
			throw {
				code: 401,
				message: "Not Authorized.",
			};
		}
		await this.managerRepository.update({
			id: manager.id,
			isActive: status,
		});
	}
}

export { ToggleManagerStatusService };
