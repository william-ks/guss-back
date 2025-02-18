import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { ReadOtherManagerService } from "../readOtherManager.service";
import { IManagerRepository } from "../../../repository/IManagerRepository";
import { IReadOtherManagerDTO } from "../entities/readOtherManager.DTO";

describe("ReadOtherManagerService", () => {
	let readOtherManagerService: ReadOtherManagerService;
	let managerRepository: IManagerRepository;

	beforeEach(() => {
		managerRepository = {
			findUniqueBy: vi.fn(),
			save: vi.fn(),
			listAll: vi.fn(),
			findAnother: vi.fn(),
			update: vi.fn(),
			softDelete: vi.fn(),
		} as IManagerRepository;

		readOtherManagerService = new ReadOtherManagerService(
			managerRepository,
		);
	});

	it("should return a manager by publicId", async () => {
		const manager = {
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			role: {
				id: 1,
				title: "Admin",
				points: 10,
			},
			permissions: ["read", "write"],
		};

		(managerRepository.findUniqueBy as Mock).mockResolvedValue(manager);

		const props: IReadOtherManagerDTO = { publicId: "publicId" };

		const result = await readOtherManagerService.execute(props);

		expect(result).toEqual({
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			isActive: true,
			createdAt: expect.any(Date),
			role: {
				id: 1,
				title: "Admin",
				points: 10,
			},
			permissions: ["read", "write"],
		});
	});

	it("should throw an error if manager is not found", async () => {
		(managerRepository.findUniqueBy as Mock).mockResolvedValueOnce(null);

		const props: IReadOtherManagerDTO = { publicId: "publicId" };

		await expect(readOtherManagerService.execute(props)).rejects.toThrow(
			"Manager not found",
		);
	});
});
