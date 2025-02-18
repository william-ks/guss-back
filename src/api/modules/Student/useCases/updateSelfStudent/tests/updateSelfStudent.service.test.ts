import { describe, it, expect, vi } from "vitest";
import { UpdateSelfStudentService } from "../updateSelfStudent.service";
import { IStudentRepository } from "../../../repository/IStudentRepository";
import { IPasswordProvider } from "../../../../../providers/PasswordProvider/IPasswordProvider";
import { Student } from "../../../model/Student";

describe("UpdateSelfStudentService", () => {
	it("should update the student data", async () => {
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn(),
			save: vi.fn(),
			listAll: vi.fn(),
			findAnother: vi.fn().mockResolvedValue(null),
			update: vi.fn().mockResolvedValue({}),
			softDelete: vi.fn(),
		};

		const passwordProvider: IPasswordProvider = {
			hash: vi.fn().mockResolvedValue("hashedPassword"),
			generatePass: vi.fn(),
			validate: vi.fn(),
		};

		const service = new UpdateSelfStudentService(
			studentRepository,
			passwordProvider,
		);
		const studentData: Student = {
			id: 1,
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			password: "hashedPassword",
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const updateData = {
			name: "John Updated",
			email: "john.updated@example.com",
			student: studentData,
		};

		// Act
		await service.execute(updateData);

		// Assert
		expect(studentRepository.update).toHaveBeenCalledWith({
			id: 1,
			name: "John Updated",
			email: "john.updated@example.com",
		});
	});

	it("should throw an error if no data to update", async () => {
		// Arrange
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn(),
			save: vi.fn(),
			listAll: vi.fn(),
			findAnother: vi.fn(),
			update: vi.fn(),
			softDelete: vi.fn(),
		};

		const passwordProvider: IPasswordProvider = {
			hash: vi.fn(),
			generatePass: vi.fn(),
			validate: vi.fn(),
		};

		const service = new UpdateSelfStudentService(
			studentRepository,
			passwordProvider,
		);
		const studentData: Student = {
			id: 1,
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			password: "hashedPassword",
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const updateData = {
			student: studentData,
		};

		// Act & Assert
		await expect(service.execute(updateData)).rejects.toThrow(
			"There is not enough data to update the current manager's information.",
		);
	});
});
