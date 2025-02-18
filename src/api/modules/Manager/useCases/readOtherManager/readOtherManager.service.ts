import { IReadOtherManagerDTO } from "./entities/readOtherManager.DTO";
import { IManagerRepository } from "../../repository/IManagerRepository";

class ReadOtherManagerService {
	constructor(private managerRepository: IManagerRepository) {}

	async execute({ publicId }: IReadOtherManagerDTO) {
		const found = await this.managerRepository.findUniqueBy({
			key: "publicId",
			value: publicId,
		});

		if (!found) {
			throw {
				code: 404,
				message: "Manager not found",
			};
		}

		const {
			password,
			id,
			isDefaultPassword,
			updatedAt,
			isDeleted,
			...manager
		} = found;

		return manager;
	}
}

export { ReadOtherManagerService };
