import { describe, it, expect, vi } from "vitest";
import { ToggleStudentStatusService } from "../toggleStudentStatus.service";
import { IStudentRepository } from "../../../repository/IStudentRepository";

describe("ToggleStudentStatusService", () => {
	it("should toggle the student status", async () => {
		// Arrange
		const studentRepository: IStudentRepository = {
			findUniqueBy: vi.fn().mockResolvedValue({
				id: 1,
				publicId: "publicId",
				isActive: false,
			}),
			save: vi.fn(),
			listAll: vi.fn(),
			findAnother: vi.fn(),
			update: vi.fn().mockResolvedValue({}),
			softDelete: vi.fn(),
		};

		const service = new ToggleStudentStatusService(studentRepository);
		const toggleData = {
			studentId: "publicId",
			status: true,
		};

		// Act
		await service.execute(toggleData);

		// Assert
		expect(studentRepository.update).toHaveBeenCalledWith({
			id: 1,
			isActive: true,
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

		const service = new ToggleStudentStatusService(studentRepository);
		const toggleData = {
			studentId: "publicId",
			status: true,
		};

		// Act & Assert
		await expect(service.execute(toggleData)).rejects.toThrow(
			"Student not found.",
		);
	});
});
