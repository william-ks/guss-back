import z from "zod";

const toggleStudentActiveSchema = {
	tags: ["Classroom"],
	summary: "ToggleStudentActive",
	description: "ToggleStudentActive",
	params: z.object({
		classroomId: z.string(),
		studentId: z.string(),
	}),
};

type TToggleStudentActiveParams = z.infer<
	typeof toggleStudentActiveSchema.params
>;

export { toggleStudentActiveSchema, TToggleStudentActiveParams };
