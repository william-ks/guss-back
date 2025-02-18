import { describe, it, expect, vi } from "vitest";
import { ReadSelfStudentService } from "../readSelfStudent.service";
import { IStudentRepository } from "../../../repository/IStudentRepository";
import { Student } from "../../../model/Student";

describe("ReadSelfStudentService", () => {
	it("should return the student data", async () => {
		// Arrange
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn(),
			save: vi.fn(),
			listAll: vi.fn(),
			findAnother: vi.fn(),
			update: vi.fn(),
			softDelete: vi.fn(),
		};

		const service = new ReadSelfStudentService(studentRepository);
		const studentData: Student = {
			publicId: "publicId",
			name: "John Doe",
			email: "john.doe@example.com",
			password: "hashedPassword",
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Act
		const result = await service.execute({ student: studentData });

		// Assert
		expect(result).toEqual(studentData);
	});
});
