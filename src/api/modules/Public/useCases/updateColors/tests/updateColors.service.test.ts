import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateColorsService } from "../updateColors.service";
import { IManagerRepository } from "../../../../Manager/repository/IManagerRepository";
import { IStudentRepository } from "../../../../Student/repository/IStudentRepository";
import { IUpdateColorsDTO } from "../entities/updateColors.DTO";
import { Manager } from "../../../../Manager/model/Manager";

describe("UpdateColorsService", () => {
	let updateColorsService: UpdateColorsService;
	let managerRepository: IManagerRepository;
	let studentRepository: IStudentRepository;

	beforeEach(() => {
		managerRepository = {
			update: vi.fn(),
		} as unknown as IManagerRepository;

		studentRepository = {
			update: vi.fn(),
		} as unknown as IStudentRepository;

		updateColorsService = new UpdateColorsService(
			managerRepository,
			studentRepository,
		);
	});

	it("should throw an error if neither manager nor student is provided", async () => {
		const props: IUpdateColorsDTO = {
			primaryColor: "red",
			grayColor: "slate",
			theme: "light",
		};

		await expect(updateColorsService.execute(props)).rejects.toEqual({
			code: 404,
			message: "Manager or Student not found",
		});
	});

	it("should throw an error if no valid fields to update are provided", async () => {
		const props: IUpdateColorsDTO = {
			manager: { id: 1 } as Manager,
			primaryColor: "invalidColor",
		};

		await expect(updateColorsService.execute(props)).rejects.toEqual({
			code: 400,
			message: "No fields to update",
		});
	});

	it("should update manager colors successfully", async () => {
		const props: IUpdateColorsDTO = {
			manager: { id: 1 } as Manager,
			primaryColor: "red",
			grayColor: "slate",
			theme: "light",
		};

		await updateColorsService.execute(props);

		expect(managerRepository.update).toHaveBeenCalledWith({
			id: 1,
			primaryColor: "red",
			grayColor: "slate",
			theme: "light",
		});
	});

	it("should update student colors successfully", async () => {
		const props: IUpdateColorsDTO = {
			student: { id: 1 } as Manager,
			primaryColor: "red",
			grayColor: "slate",
			theme: "light",
		};

		await updateColorsService.execute(props);

		expect(studentRepository.update).toHaveBeenCalledWith({
			id: 1,
			primaryColor: "red",
			grayColor: "slate",
			theme: "light",
		});
	});
});
