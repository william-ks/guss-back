import { describe, it, expect, vi } from "vitest";
import { ReadSelfManagerService } from "../readSelfManager.service";
import { IManagerRepository } from "../../../repository/IManagerRepository";
import { IReadSelfManagerDTO } from "../entities/readSelfManager.DTO";

describe("ReadSelfManagerService", () => {
	it("should return the correct data object", async () => {
		const mockRepository: IManagerRepository = {
			save: vi.fn(),
			listAll: vi.fn(),
			findAnother: vi.fn(),
			findUniqueBy: vi.fn(),
			update: vi.fn(),
			softDelete: vi.fn(),
		};

		const mockDTO: IReadSelfManagerDTO = {
			publicId: "123",
			photo: "photo_url",
			name: "John Doe",
			email: "john.doe@example.com",
			cpf: "12345678900",
			phone: "1234567890",
			birthday: "1990-01-01",
			address: "123 Main St",
			roleId: 123,
			permissions: ["read", "write"],
			isActive: true,
			createdAt: new Date("2020-01-01"),
			updatedAt: new Date("2021-01-01"),
			role: {
				id: 123,
				title: "Manager",
				points: 100,
			},
		};

		const service = new ReadSelfManagerService(mockRepository);
		const result = await service.execute(mockDTO);

		expect(result).toEqual({
			publicId: "123",
			photo: "photo_url",
			name: "John Doe",
			email: "john.doe@example.com",
			cpf: "12345678900",
			phone: "1234567890",
			birthday: "1990-01-01",
			address: "123 Main St",
			roleId: 123,
			permissions: ["read", "write"],
			isDefaultPassword: true,
			isActive: true,
			createdAt: new Date("2020-01-01"),
			updatedAt: new Date("2021-01-01"),
			role: {
				id: 123,
				title: "Manager",
				points: 100,
			},
			classes: [],
		});
	});
});
