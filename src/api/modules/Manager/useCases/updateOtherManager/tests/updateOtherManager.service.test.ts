import { describe, it, expect, beforeEach, Mock } from "vitest";
import { vi } from "vitest";
import { UpdateOtherManagerService } from "../updateOtherManager.service";
import { IManagerRepository } from "../../../repository/IManagerRepository";
import { IRoleRepository } from "../../../../Role/repository/IRoleRepository";
import { IUpdateOtherManagerDTO } from "../entities/updateOtherManager.DTO";
import { IPermissionRepository } from "../../../../Permission/repository/IPermissionRepository";

describe("UpdateOtherManagerService", () => {
	let updateOtherManagerService: UpdateOtherManagerService;
	let managerRepository: IManagerRepository;
	let roleRepository: IRoleRepository;
	let permissionRepository: IPermissionRepository;

	beforeEach(() => {
		managerRepository = {
			findUniqueBy: vi.fn(),
			update: vi.fn(),
		} as unknown as IManagerRepository;

		roleRepository = {
			findUniqueById: vi.fn(),
		} as unknown as IRoleRepository;

		permissionRepository = {
			findByCode: vi.fn(),
		} as unknown as IPermissionRepository;

		updateOtherManagerService = new UpdateOtherManagerService(
			managerRepository,
			roleRepository,
			permissionRepository,
		);
	});

	it("should update manager permissions successfully", async () => {
		const managerToUpdate = {
			id: 2,
			publicId: "publicId",
			permissions: ["read"],
		};

		const actualManager = {
			id: 1,
			publicId: "publicId",
			permissions: ["read", "write"],
			roleId: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password123",
			cpf: "123.456.789-00",
		};

		(managerRepository.findUniqueBy as Mock).mockResolvedValue(
			managerToUpdate,
		);

		(permissionRepository.findByCode as Mock).mockResolvedValue({
			id: 2,
			code: "write",
		});

		const props: IUpdateOtherManagerDTO = {
			idToUpdate: "publicId",
			actualManager,
			permissions: [{ code: "write", toAdd: true, toRemove: false }],
		};

		await updateOtherManagerService.execute(props);

		expect(managerRepository.findUniqueBy).toHaveBeenCalledWith({
			key: "publicId",
			value: "publicId",
		});

		expect(managerRepository.update).toHaveBeenCalledWith({
			id: 2,
			permissions: ["read", "write"],
		});
	});

	it("should throw an error if manager to update is not found", async () => {
		(managerRepository.findUniqueBy as Mock).mockResolvedValue(null);

		const actualManager = {
			id: 1,
			publicId: "publicId",
			permissions: ["read", "write"],
			roleId: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password123",
			cpf: "123.456.789-00",
		};

		const props: IUpdateOtherManagerDTO = {
			idToUpdate: "publicId",
			actualManager,
			permissions: [{ code: "write", toAdd: true, toRemove: false }],
		};

		await expect(updateOtherManagerService.execute(props)).rejects.toEqual({
			code: 404,
			message: "Manager not found.",
		});
	});

	it("should throw an error if trying to update own permissions", async () => {
		const actualManager = {
			id: 1,
			publicId: "publicId",
			permissions: ["read", "write"],
			roleId: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password123",
			cpf: "123.456.789-00",
		};

		(managerRepository.findUniqueBy as Mock).mockResolvedValue(
			actualManager,
		);

		const props: IUpdateOtherManagerDTO = {
			idToUpdate: "publicId",
			actualManager,
			permissions: [{ code: "write", toAdd: true, toRemove: false }],
		};

		await expect(updateOtherManagerService.execute(props)).rejects.toEqual({
			code: 401,
			message: "You can't update your own permissions.",
		});
	});

	it("should update manager role successfully", async () => {
		const managerToUpdate = {
			id: 2,
			publicId: "publicId",
			role: { points: 5, title: "Manager" },
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password123",
			cpf: "123.456.789-00",
			roleId: 1,
		};

		const actualManager = {
			id: 1,
			publicId: "actualPublicId",
			permissions: ["read", "write"],
			role: { points: 10, title: "Manager" },
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password123",
			cpf: "123.456.789-00",
			roleId: 1,
		};

		const role = {
			id: 3,
			title: "Manager",
			points: 8,
		};

		(managerRepository.findUniqueBy as Mock).mockResolvedValue(
			managerToUpdate,
		);
		(roleRepository.findUniqueById as Mock).mockResolvedValue(role);

		const props: IUpdateOtherManagerDTO = {
			idToUpdate: "publicId",
			actualManager,
			roleId: 3,
		};

		await updateOtherManagerService.execute(props);

		expect(managerRepository.findUniqueBy).toHaveBeenCalledWith({
			key: "publicId",
			value: "publicId",
		});
		expect(roleRepository.findUniqueById).toHaveBeenCalledWith(3);
		expect(managerRepository.update).toHaveBeenCalledWith({
			id: 2,
			roleId: 3,
		});
	});

	it("should throw an error if roleId is not found", async () => {
		const managerToUpdate = {
			id: 2,
			publicId: "publicId",
			permissions: ["read"],
			role: { points: 5, title: "Manager" },
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password123",
			cpf: "123.456.789-00",
			roleId: 1,
		};

		const actualManager = {
			id: 1,
			publicId: "actualPublicId",
			permissions: ["read", "write"],
			role: { points: 10, title: "Manager" },
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password123",
			cpf: "123.456.789-00",
			roleId: 1,
		};

		(managerRepository.findUniqueBy as Mock).mockResolvedValue(
			managerToUpdate,
		);
		(roleRepository.findUniqueById as Mock).mockResolvedValue(null);

		const props: IUpdateOtherManagerDTO = {
			idToUpdate: "publicId",
			actualManager,
			roleId: 3,
		};

		await expect(updateOtherManagerService.execute(props)).rejects.toEqual({
			code: 404,
			message: "RoleId not found: 3",
		});
	});

	it("should throw an error if actual manager role points are less than the role to assign", async () => {
		const managerToUpdate = {
			id: 2,
			publicId: "publicId",
			permissions: ["read"],
			role: { points: 5 },
		};

		const actualManager = {
			id: 1,
			publicId: "actualPublicId",
			permissions: ["read", "write"],
			role: { points: 5, title: "Manager" },
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password123",
			cpf: "123.456.789-00",
			roleId: 1,
		};

		const role = {
			id: 3,
			title: "Manager",
			points: 8,
		};

		(managerRepository.findUniqueBy as Mock).mockResolvedValue(
			managerToUpdate,
		);
		(roleRepository.findUniqueById as Mock).mockResolvedValue(role);

		const props: IUpdateOtherManagerDTO = {
			idToUpdate: "publicId",
			actualManager,
			roleId: 3,
		};

		await expect(updateOtherManagerService.execute(props)).rejects.toEqual({
			code: 401,
			message: `You can't assign a manager with role ${role.title}`,
		});
	});
});
