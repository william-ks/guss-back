import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginManagerService } from "../loginManager.service";
import { IManagerRepository } from "../../../repository/IManagerRepository";
import { IPasswordProvider } from "../../../../../providers/PasswordProvider/IPasswordProvider";
import { ITokenProvider } from "../../../../../providers/TokenProvider/ITokenProvider";
import { ILoginManagerDTO } from "../entities/loginManager.DTO";

describe("LoginManagerService", () => {
	let loginManagerService: LoginManagerService;
	let managerRepository: IManagerRepository;
	let handlePass: IPasswordProvider;
	let handleToken: ITokenProvider;

	beforeEach(() => {
		managerRepository = {
			findUniqueBy: vi.fn(),
		} as any;

		handlePass = {
			validate: vi.fn(),
		} as any;

		handleToken = {
			createToken: vi.fn(),
		} as any;

		loginManagerService = new LoginManagerService(
			managerRepository,
			handlePass,
			handleToken,
		);
	});

	it("should throw an error if email does not exist", async () => {
		(managerRepository.findUniqueBy as vi.Mock).mockResolvedValueOnce(null);

		const props: ILoginManagerDTO = {
			email: "test@example.com",
			password: "password123",
		};

		await expect(loginManagerService.execute(props)).rejects.toEqual({
			code: 404,
			message: "E-mail or password are invalid.",
		});
	});

	it("should throw an error if account is inactive", async () => {
		(managerRepository.findUniqueBy as vi.Mock).mockResolvedValueOnce({
			isActive: false,
		});

		const props: ILoginManagerDTO = {
			email: "test@example.com",
			password: "password123",
		};

		await expect(loginManagerService.execute(props)).rejects.toEqual({
			code: 401,
			message: "Account is inactive, please talk with adm.",
		});
	});

	it("should throw an error if password is invalid", async () => {
		(managerRepository.findUniqueBy as vi.Mock).mockResolvedValueOnce({
			isActive: true,
			password: "hashedPassword",
		});
		(handlePass.validate as vi.Mock).mockResolvedValueOnce(false);

		const props: ILoginManagerDTO = {
			email: "test@example.com",
			password: "password123",
		};

		await expect(loginManagerService.execute(props)).rejects.toEqual({
			code: 400,
			message: "E-mail or password are invalid.",
		});
	});

	it("should return user and token if login is successful", async () => {
		const manager = {
			publicId: "publicId123",
			name: "John Doe",
			photo: "photo.jpg",
			email: "test@example.com",
			password: "hashedPassword",
			isActive: true,
			role: {
				id: "roleId123",
				title: "Manager",
				points: 100,
			},
			permissions: ["read", "write"],
		};

		(managerRepository.findUniqueBy as vi.Mock).mockResolvedValueOnce(
			manager,
		);
		(handlePass.validate as vi.Mock).mockResolvedValueOnce(true);
		(handleToken.createToken as vi.Mock).mockReturnValue("token123");

		const props: ILoginManagerDTO = {
			email: "test@example.com",
			password: "password123",
		};

		const result = await loginManagerService.execute(props);

		expect(result).toEqual({
			user: {
				id: "publicId123",
				name: "John Doe",
				photo: "photo.jpg",
				email: "test@example.com",
				role: {
					id: "roleId123",
					title: "Manager",
					points: 100,
				},
				permissions: ["read", "write"],
			},
			token: "token123",
		});
	});
});
