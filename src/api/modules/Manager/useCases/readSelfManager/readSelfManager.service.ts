import { IReadSelfManagerDTO } from "./entities/readSelfManager.DTO";
import { IManagerRepository } from "../../repository/IManagerRepository";

class ReadSelfManagerService {
	constructor(private managerRepository: IManagerRepository) {}

	async execute(props: IReadSelfManagerDTO) {
		const data = {
			publicId: props.publicId,
			photo: props.photo,
			name: props.name,
			email: props.email,
			cpf: props.cpf,
			phone: props.phone,
			birthday: props.birthday,
			address: props.address,
			roleId: props.roleId,
			permissions: props.permissions,
			isDefaultPassword: props.isActive,
			isActive: props.isActive,
			createdAt: props.createdAt,
			updatedAt: props.updatedAt,
			primaryColor: props.primaryColor,
			grayColor: props.grayColor,
			theme: props.theme,
			role: {
				id: props.role.id,
				title: props.role.title,
				points: props.role.points,
			},
			classes: [],
		};

		return data;
	}
}

export { ReadSelfManagerService };
