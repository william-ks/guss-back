import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { UpdateSelfManagerService } from "../updateSelfManager.service";
import { IManagerRepository } from "../../../repository/IManagerRepository";
import { IPasswordProvider } from "../../../../../providers/PasswordProvider/IPasswordProvider";
import { IUpdateSelfManagerDTO } from "../entities/updateSelfManager.DTO";
import { Manager } from "../../../model/Manager";

describe("UpdateSelfManagerService", () => {
	let updateSelfManagerService: UpdateSelfManagerService;
	let managerRepository: IManagerRepository;
	let passwordProvider: IPasswordProvider;

	beforeEach(() => {
		managerRepository = {
			findUniqueBy: vi.fn(),
			findAnother: vi.fn(),
			update: vi.fn(),
		} as unknown as IManagerRepository;

		passwordProvider = {
			hash: vi.fn(),
		} as unknown as IPasswordProvider;

		updateSelfManagerService = new UpdateSelfManagerService(
			managerRepository,
			passwordProvider,
		);
	});

	it("should update the manager data successfully", async () => {
		const managerData: Manager = {
			id: 1,
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			password: "hashedPassword",
			cpf: "12345678901",
			phone: "1234567890",
			birthday: "1990-01-01",
			address: "123 Test Street",
			roleId: 1,
			permissions: ["read", "write"],
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const updateData: IUpdateSelfManagerDTO = {
			manager: managerData,
			name: "John Updated",
			email: "john.updated@example.com",
		};

		await updateSelfManagerService.execute(updateData);

		expect(managerRepository.update).toHaveBeenCalledWith({
			id: 1,
			name: "John Updated",
			email: "john.updated@example.com",
		});
	});

	it("should throw an error if no data to update", async () => {
		const managerData: Manager = {
			id: 1,
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			password: "hashedPassword",
			cpf: "12345678901",
			phone: "1234567890",
			birthday: "1990-01-01",
			address: "123 Test Street",
			roleId: 1,
			permissions: ["read", "write"],
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const updateData: IUpdateSelfManagerDTO = {
			manager: managerData,
		};

		await expect(
			updateSelfManagerService.execute(updateData),
		).rejects.toEqual({
			code: 400,
			message:
				"There is not enough data to update the current manager's information.",
		});
	});

	it("should update the manager password successfully", async () => {
		const managerData: Manager = {
			id: 1,
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			password: "hashedPassword",
			cpf: "12345678901",
			phone: "1234567890",
			birthday: "1990-01-01",
			address: "123 Test Street",
			roleId: 1,
			permissions: ["read", "write"],
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const updateData: IUpdateSelfManagerDTO = {
			manager: managerData,
			password: "newPassword123",
		};

		passwordProvider.hash = vi.fn().mockResolvedValue("newHashedPassword");

		await updateSelfManagerService.execute(updateData);

		expect(passwordProvider.hash).toHaveBeenCalledWith("newPassword123");
		expect(managerRepository.update).toHaveBeenCalledWith({
			id: 1,
			password: "newHashedPassword",
		});
	});

	it("should throw an error if email already exists", async () => {
		const managerData: Manager = {
			id: 1,
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			password: "hashedPassword",
			cpf: "12345678901",
			phone: "1234567890",
			birthday: "1990-01-01",
			address: "123 Test Street",
			roleId: 1,
			permissions: ["read", "write"],
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const updateData: IUpdateSelfManagerDTO = {
			manager: managerData,
			email: "existing.email@example.com",
		};

		(managerRepository.findAnother as Mock).mockResolvedValue(true);

		await expect(
			updateSelfManagerService.execute(updateData),
		).rejects.toEqual({
			code: 400,
			message: "Already exists a manager with this E-mail.",
		});
	});

	it("should throw an error if CPF already exists", async () => {
		const managerData: Manager = {
			id: 1,
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			password: "hashedPassword",
			cpf: "12345678901",
			phone: "1234567890",
			birthday: "1990-01-01",
			address: "123 Test Street",
			roleId: 1,
			permissions: ["read", "write"],
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const updateData: IUpdateSelfManagerDTO = {
			manager: managerData,
			cpf: "existingCPF",
		};

		(managerRepository.findAnother as Mock).mockResolvedValue(true);

		await expect(
			updateSelfManagerService.execute(updateData),
		).rejects.toEqual({
			code: 400,
			message: "Already exists a manager with this CPF.",
		});
	});
});
