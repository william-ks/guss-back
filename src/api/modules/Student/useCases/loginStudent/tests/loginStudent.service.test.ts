import { describe, it, expect, vi } from "vitest";
import { LoginStudentService } from "../loginStudent.service";
import { IStudentRepository } from "../../../repository/IStudentRepository";
import { IPasswordProvider } from "../../../../../providers/PasswordProvider/IPasswordProvider";
import { ITokenProvider } from "../../../../../providers/TokenProvider/ITokenProvider";

describe("LoginStudentService", () => {
	it("should login a student successfully", async () => {
		// Arrange
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn().mockResolvedValue({
				email: "john.doe@example.com",
				password: "hashedPassword",
				isActive: true,
				publicId: "publicId",
				name: "John Doe",
				photo: "photoUrl",
			}),
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

		const tokenProvider: ITokenProvider = {
			createToken: vi.fn().mockReturnValue("token"),
			readToken: vi.fn().mockReturnValue({
				id: "publicId",
				email: "john.doe@example.com",
			}),
		};

		const service = new LoginStudentService(
			studentRepository,
			passwordProvider,
			tokenProvider,
		);
		const loginData = {
			email: "john.doe@example.com",
			password: "password123",
		};

		// Act
		const result = await service.execute(loginData);

		// Assert
		expect(result).toEqual({
			user: {
				id: "publicId",
				name: "John Doe",
				photo: "photoUrl",
				email: "john.doe@example.com",
			},
			token: "token",
		});
	});

	it("should throw an error if email or password is invalid", async () => {
		// Arrange
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn().mockResolvedValue(null),
			save: vi.fn(),
			listAll: vi.fn().mockResolvedValue([]),
			findAnother: vi.fn().mockResolvedValue(null),
			update: vi.fn().mockResolvedValue({}),
			softDelete: vi.fn().mockResolvedValue({}),
		};

		const passwordProvider: IPasswordProvider = {
			hash: vi.fn(),
			generatePass: vi.fn(),
			validate: vi.fn().mockResolvedValue(false),
		};

		const tokenProvider: ITokenProvider = {
			createToken: vi.fn(),
			readToken: vi.fn().mockReturnValue({
				id: "publicId",
				email: "john.doe@example.com",
			}),
		};

		const service = new LoginStudentService(
			studentRepository,
			passwordProvider,
			tokenProvider,
		);
		const loginData = {
			email: "john.doe@example.com",
			password: "wrongPassword",
		};

		// Act & Assert
		await expect(service.execute(loginData)).rejects.toThrow(
			"E-mail or password are invalid.",
		);
	});
});
