import { describe, it, expect, vi } from "vitest";
import { ReadAllStudentsService } from "../readAllStudents.service";
import { IStudentRepository } from "../../../repository/IStudentRepository";

describe("ReadAllStudentsService", () => {
	it("should return all students", async () => {
		// Arrange
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn(),
			save: vi.fn(),
			listAll: vi.fn().mockResolvedValue([
				{
					publicId: "publicId1",
					name: "John Doe",
					email: "john.doe@example.com",
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					publicId: "publicId2",
					name: "Jane Doe",
					email: "jane.doe@example.com",
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]),
			findAnother: vi.fn(),
			update: vi.fn(),
			softDelete: vi.fn(),
		};

		const service = new ReadAllStudentsService(studentRepository);

		// Act
		const result = await service.execute();

		// Assert
		expect(result).toEqual([
			{
				publicId: "publicId1",
				name: "John Doe",
				email: "john.doe@example.com",
				isActive: true,
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			},
			{
				publicId: "publicId2",
				name: "Jane Doe",
				email: "jane.doe@example.com",
				isActive: true,
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			},
		]);
	});
});
