import { describe, it, expect, vi } from "vitest";
import { ReadOneStudentService } from "../readOneStudent.service";
import { IStudentRepository } from "../../../repository/IStudentRepository";

describe("ReadOneStudentService", () => {
	it("should return a student by id", async () => {
		// Arrange
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn().mockResolvedValue({
				publicId: "publicId",
				name: "John Doe",
				email: "john.doe@example.com",
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			}),
			save: vi.fn(),
			listAll: vi.fn(),
			findAnother: vi.fn(),
			update: vi.fn(),
			softDelete: vi.fn(),
		};

		const service = new ReadOneStudentService(studentRepository);
		const studentData = {
			id: "publicId",
		};

		// Act
		const result = await service.execute(studentData);

		// Assert
		expect(result).toEqual({
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			isActive: true,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});

	it("should throw an error if student is not found", async () => {
		// Arrange
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn().mockResolvedValue(null),
			save: vi.fn(),
			listAll: vi.fn(),
			findAnother: vi.fn(),
			update: vi.fn(),
			softDelete: vi.fn(),
		};

		const service = new ReadOneStudentService(studentRepository);
		const studentData = {
			id: "publicId",
		};

		// Act & Assert
		await expect(service.execute(studentData)).rejects.toThrow(
			"Student not found.",
		);
	});
});
