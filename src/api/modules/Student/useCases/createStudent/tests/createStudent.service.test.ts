import { describe, it, expect, vi } from "vitest";
import { CreateStudentService } from "../createStudent.service";
import { IStudentRepository } from "../../../repository/IStudentRepository";
import { IPasswordProvider } from "../../../../../providers/PasswordProvider/IPasswordProvider";

describe("CreateStudentService", () => {
	it("should create a student successfully", async () => {
		// Arrange
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn().mockResolvedValue(null),
			save: vi.fn().mockResolvedValue({}),
			listAll: vi.fn().mockResolvedValue([]),
			findAnother: vi.fn().mockResolvedValue(null),
			update: vi.fn().mockResolvedValue({}),
			softDelete: vi.fn().mockResolvedValue({}),
		};

		const passwordProvider: IPasswordProvider = {
			hash: vi.fn().mockResolvedValue("hashedPassword"),
			generatePass: vi.fn().mockReturnValue("generatedPassword"),
			validate: vi.fn().mockResolvedValue(true),
		};
		const service = new CreateStudentService(
			studentRepository,
			passwordProvider,
		);
		const studentData = {
			name: "John Doe",
			email: "john.doe@example.com",
			cpf: "123.456.789-00",
			password: "password123",
		};

		// Act
		await service.execute(studentData);

		// Assert
		expect(studentRepository.findUniqueBy).toHaveBeenCalledWith({
			key: "email",
			value: studentData.email,
		});
		expect(studentRepository.save).toHaveBeenCalled();
	});

	it("should throw an error if email or cpf already exists", async () => {
		// Arrange
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn().mockResolvedValue({}),
			save: vi.fn(),
			listAll: vi.fn().mockResolvedValue([]),
			findAnother: vi.fn().mockResolvedValue(null),
			update: vi.fn().mockResolvedValue({}),
			softDelete: vi.fn().mockResolvedValue({}),
		};
		const passwordProvider: IPasswordProvider = {
			hash: vi.fn(),
			generatePass: vi.fn(),
			validate: vi.fn().mockResolvedValue(true),
		};
		const service = new CreateStudentService(
			studentRepository,
			passwordProvider,
		);
		const studentData = {
			name: "John Doe",
			email: "john.doe@example.com",
			cpf: "123.456.789-00",
			password: "password123",
		};

		// Act & Assert
		await expect(service.execute(studentData)).rejects.toThrow(
			"Email or CPF already exists",
		);
	});
});
