/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { IPasswordProvider } from "../../../../../providers/PasswordProvider/IPasswordProvider";
import { IPermissionRepository } from "../../../../Permission/repository/IPermissionRepository";
import { IRoleRepository } from "../../../../Role/repository/IRoleRepository";
import { IManagerRepository } from "../../../repository/IManagerRepository";
import { CreateManagerService } from "../createManager.service";
import { ICreateManagerDTO } from "../entities/createManager.DTO";

describe("CreateManagerService", () => {
	let createManagerService: CreateManagerService;
	let managerRepository: vi.Mocked<IManagerRepository>;
	let handlePass: vi.Mocked<IPasswordProvider>;
	let roleRepository: vi.Mocked<IRoleRepository>;
	let permissionRepository: vi.Mocked<IPermissionRepository>;

	beforeEach(() => {
		vi.clearAllMocks();

		managerRepository = {
			findUniqueBy: vi.fn(),
			save: vi.fn(),
		};

		handlePass = {
			generatePass: vi.fn(),
			hash: vi.fn(),
		};

		roleRepository = {
			findUniqueById: vi.fn(),
		};

		permissionRepository = {
			// Inicialize com métodos ou dados necessários
		} as vi.Mocked<IPermissionRepository>;

		createManagerService = new CreateManagerService(
			managerRepository,
			handlePass,
			roleRepository,
			permissionRepository,
		);
	});

	it("should throw an error if email already exists", async () => {
		managerRepository.findUniqueBy.mockResolvedValueOnce(true);

		const props: ICreateManagerDTO = {
			email: "test@example.com",
			cpf: "12345678901",
			roleId: 1,
			name: "Test User",
			photo: "photo123.jpg",
			password: "password123",
			phone: "1234567890",
			birthday: "01-01-2000",
			address: "123 Test Street",
			permissions: ["read", "write"],
		};

		await expect(createManagerService.execute(props)).rejects.toMatchObject(
			{
				code: 400,
				message: expect.stringContaining("e-mail already exists"),
			},
		);
	});

	it("should throw an error if cpf already exists", async () => {
		managerRepository.findUniqueBy.mockResolvedValueOnce(false);
		managerRepository.findUniqueBy.mockResolvedValueOnce(true);

		const props: ICreateManagerDTO = {
			email: "test@example.com",
			cpf: "12345678901",
			roleId: 1,
			name: "Test User",
			photo: "photo123.jpg",
			password: "password123",
			phone: "1234567890",
			birthday: "01-01-2000",
			address: "123 Test Street",
			permissions: ["read", "write"],
		};

		await expect(createManagerService.execute(props)).rejects.toMatchObject(
			{
				code: 400,
				message: expect.stringContaining("cpf already exists"),
			},
		);
	});

	it("should throw an error if role not found", async () => {
		managerRepository.findUniqueBy.mockResolvedValueOnce(false);
		managerRepository.findUniqueBy.mockResolvedValueOnce(false);
		roleRepository.findUniqueById.mockResolvedValueOnce(null);

		const props: ICreateManagerDTO = {
			email: "test@example.com",
			cpf: "12345678901",
			roleId: 1,
			name: "Test User",
			photo: "photo123.jpg",
			password: "password123",
			phone: "1234567890",
			birthday: "01-01-2000",
			address: "123 Test Street",
			permissions: ["read", "write"],
		};

		await expect(createManagerService.execute(props)).rejects.toMatchObject(
			{
				code: 404,
				message: expect.stringContaining("Role not found"),
			},
		);
	});

	it("should create a manager successfully", async () => {
		managerRepository.findUniqueBy.mockResolvedValueOnce(false);
		managerRepository.findUniqueBy.mockResolvedValueOnce(false);
		roleRepository.findUniqueById.mockResolvedValueOnce(true);
		handlePass.generatePass.mockReturnValue("generatedPassword");
		handlePass.hash.mockResolvedValueOnce("hashedPassword");

		const props: ICreateManagerDTO = {
			email: "test@example.com",
			cpf: "12345678901",
			roleId: 1,
			name: "Test User",
			photo: "photo123.jpg",
			password: "password123",
			phone: "1234567890",
			birthday: "01-01-2000",
			address: "123 Test Street",
			permissions: ["read", "write"],
		};

		await createManagerService.execute(props);

		expect(managerRepository.save).toHaveBeenCalledWith(
			expect.objectContaining({
				email: "test@example.com",
				cpf: "12345678901",
				roleId: 1,
				name: "Test User",
				photo: "photo123.jpg",
				password: "hashedPassword",
				phone: "1234567890",
				birthday: "01-01-2000",
				address: "123 Test Street",
				permissions: ["read", "write"],
			}),
		);
		expect(handlePass.hash).toHaveBeenCalledWith("generatedPassword");
	});
});
