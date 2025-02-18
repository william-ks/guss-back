import { describe, it, expect, vi } from "vitest";
import { ReadAllRolesService } from "../readAllRoles.service";
import { IRoleRepository } from "../../../repository/IRoleRepository";

describe("ReadAllRolesService", () => {
	it("should return all roles", async () => {
		const roleRepository: IRoleRepository = {
			listAll: vi.fn().mockResolvedValue([
				{ id: 1, title: "Admin", points: 10 },
				{ id: 2, title: "User", points: 5 },
			]),
			findUniqueByTitle: vi.fn(),
			save: vi.fn(),
			findUniqueById: vi.fn(),
			update: vi.fn(),
			softDelete: vi.fn(),
		};

		const service = new ReadAllRolesService(roleRepository);

		const result = await service.execute();

		expect(result).toEqual([
			{ id: 1, title: "Admin", points: 10 },
			{ id: 2, title: "User", points: 5 },
		]);
	});
});
