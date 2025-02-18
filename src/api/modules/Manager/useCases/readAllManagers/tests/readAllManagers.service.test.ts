/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReadAllManagersService } from "../readAllManagers.service";
import { IManagerRepository } from "../../../repository/IManagerRepository";

describe("ReadAllManagersService", () => {
	let readAllManagersService: ReadAllManagersService;
	let managerRepository: IManagerRepository;

	beforeEach(() => {
		managerRepository = {
			listAll: vi.fn(),
		} as any;

		readAllManagersService = new ReadAllManagersService(managerRepository);
	});

	it("should return a list of managers without passwords", async () => {
		const managersRaw = [
			{
				publicId: "publicId1",
				name: "John Doe",
				email: "john@example.com",
				password: "hashedPassword1",
				roleId: 1,
				permissions: ["read"],
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				publicId: "publicId2",
				name: "Jane Doe",
				email: "jane@example.com",
				password: "hashedPassword2",
				roleId: 2,
				permissions: ["write"],
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		(managerRepository.listAll as vi.Mock).mockResolvedValueOnce(
			managersRaw,
		);

		const result = await readAllManagersService.execute();

		expect(result).toEqual([
			{
				publicId: "publicId1",
				name: "John Doe",
				email: "john@example.com",
				roleId: 1,
				permissions: ["read"],
				isActive: true,
				createdAt: managersRaw[0].createdAt,
				updatedAt: managersRaw[0].updatedAt,
			},
			{
				publicId: "publicId2",
				name: "Jane Doe",
				email: "jane@example.com",
				roleId: 2,
				permissions: ["write"],
				isActive: true,
				createdAt: managersRaw[1].createdAt,
				updatedAt: managersRaw[1].updatedAt,
			},
		]);
	});

	it("should return an empty list if no managers are found", async () => {
		(managerRepository.listAll as vi.Mock).mockResolvedValueOnce([]);

		const result = await readAllManagersService.execute();

		expect(result).toEqual([]);
	});
});
