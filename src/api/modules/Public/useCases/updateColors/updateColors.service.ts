import { IManagerRepository } from "../../../Manager/repository/IManagerRepository";
import { IStudentRepository } from "../../../Student/repository/IStudentRepository";
import { IUpdateColorsDTO } from "./entities/updateColors.DTO";

class UpdateColorsService {
	constructor(
		private managerRepository: IManagerRepository,
		private studentRepository: IStudentRepository,
	) {}

	async execute(props: IUpdateColorsDTO) {
		const { manager, student, ...data } = props;

		if (!manager && !student) {
			throw {
				code: 404,
				message: "Manager or Student not found",
			};
		}

		const acceptedColorsPrimary = new Set([
			"red",
			"orange",
			"amber",
			"yellow",
			"lime",
			"green",
			"emerald",
			"teal",
			"cyan",
			"sky",
			"blue",
			"indigo",
			"violet",
			"purple",
			"fuchsia",
			"pink",
			"rose",
		]);

		const acceptedColorsGray = new Set([
			"slate",
			"cool",
			"zinc",
			"neutral",
			"stone",
		]);

		const acceptedThemes = new Set(["light", "dark"]);

		const fieldsToUpdate = Object.keys(data).filter((key) => {
			if (key === "primaryColor") {
				if (data[key] && acceptedColorsPrimary.has(data[key])) {
					return key;
				}
			}

			if (key === "grayColor") {
				if (data[key] && acceptedColorsGray.has(data[key])) {
					return key;
				}
			}

			if (key === "theme") {
				if (data[key] && acceptedThemes.has(data[key])) {
					return key;
				}
			}
		});

		if (fieldsToUpdate.length === 0) {
			throw {
				code: 400,
				message: "No fields to update",
			};
		}

		const dataToUpdate = {};

		for (const field of fieldsToUpdate) {
			dataToUpdate[field] = data[field];
		}

		if (manager) {
			await this.managerRepository.update({
				id: manager.id,
				...dataToUpdate,
			});

			return;
		}

		if (student) {
			await this.studentRepository.update({
				id: student.id,
				...dataToUpdate,
			});

			return;
		}
	}
}

export { UpdateColorsService };
