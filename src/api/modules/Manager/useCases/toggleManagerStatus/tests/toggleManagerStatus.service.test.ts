import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { ToggleManagerStatusService } from "../toggleManagerStatus.service";
import { IManagerRepository } from "../../../repository/IManagerRepository";
import { IToggleManagerStatusDTO } from "../entities/toggleManagerStatus.DTO";

describe("ToggleManagerStatusService", () => {
	let toggleManagerStatusService: ToggleManagerStatusService;
	let managerRepository: IManagerRepository;

	beforeEach(() => {
		managerRepository = {
			findUniqueBy: vi.fn(),
			update: vi.fn(),
		} as unknown as IManagerRepository;

		toggleManagerStatusService = new ToggleManagerStatusService(
			managerRepository,
		);
	});

	it("should toggle the manager status successfully", async () => {
		const manager = {
			id: 2,
			publicId: "publicId",
			isActive: false,
		};

		(managerRepository.findUniqueBy as Mock).mockResolvedValue(manager);

		const props: IToggleManagerStatusDTO = {
			idToUpdate: "publicId",
			actualId: 1,
			status: true,
		};

		await toggleManagerStatusService.execute(props);

		expect(managerRepository.findUniqueBy).toHaveBeenCalledWith({
			key: "publicId",
			value: "publicId",
		});
		expect(managerRepository.update).toHaveBeenCalledWith({
			id: 2,
			isActive: true,
		});
	});

	it("should throw an error if manager is not found", async () => {
		(managerRepository.findUniqueBy as Mock).mockResolvedValue(null);

		const props: IToggleManagerStatusDTO = {
			idToUpdate: "publicId",
			actualId: 1,
			status: true,
		};

		await expect(toggleManagerStatusService.execute(props)).rejects.toEqual(
			{
				code: 404,
				message: "Manager not found.",
			},
		);
	});

	it("should throw an error if trying to toggle own status", async () => {
		const manager = {
			id: 1,
			publicId: "publicId",
			isActive: false,
		};

		(managerRepository.findUniqueBy as Mock).mockResolvedValue(manager);

		const props: IToggleManagerStatusDTO = {
			idToUpdate: "publicId",
			actualId: 1,
			status: true,
		};

		await expect(toggleManagerStatusService.execute(props)).rejects.toEqual(
			{
				code: 401,
				message: "Not Authorized.",
			},
		);
	});
});
