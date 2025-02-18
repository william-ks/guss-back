import { describe, it, expect, vi } from "vitest";
import { CreateRoleService } from "../createRole.service";
import { IRoleRepository } from "../../../repository/IRoleRepository";

describe("CreateRoleService", () => {
	it("should create a role successfully", async () => {
		// Arrange
		const roleRepository: IRoleRepository = {
			findUniqueByTitle: vi.fn().mockResolvedValue(null),
			save: vi.fn().mockResolvedValue(undefined),
			listAll: vi.fn(),
			findUniqueById: vi.fn(),
			update: vi.fn(),
			softDelete: vi.fn(),
		};

		const service = new CreateRoleService(roleRepository);
		const roleData = {
			title: "Admin",
			points: 10,
		};

		// Act
		await service.execute(roleData);

		// Assert
		expect(roleRepository.findUniqueByTitle).toHaveBeenCalledWith(
			roleData.title,
		);
		expect(roleRepository.save).toHaveBeenCalledWith(roleData);
	});

	it("should throw an error if role title already exists", async () => {
		// Arrange
		const roleRepository: IRoleRepository = {
			findUniqueByTitle: vi.fn().mockResolvedValue({}),
			save: vi.fn(),
			listAll: vi.fn(),
			findUniqueById: vi.fn(),
			update: vi.fn(),
			softDelete: vi.fn(),
		};

		const service = new CreateRoleService(roleRepository);
		const roleData = {
			title: "Admin",
			points: 10,
		};

		// Act & Assert
		await expect(service.execute(roleData)).rejects.toThrow(
			"Role with this title already exists",
		);
	});
});
