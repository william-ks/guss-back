import z from "zod";

const movimentStudentsSchema = {
	tags: ["Classroom"],
	summary: "MovimentStudents",
	description: "MovimentStudents",
	body: z.object({
		classroomId: z.string(),
		studentsIds: z
			.array(z.string({ required_error: "Student ID is required" }))
			.nonempty("Students IDs are required"),
	}),
};

type TMovimentStudentsBody = z.infer<typeof movimentStudentsSchema.body>;

export { movimentStudentsSchema, TMovimentStudentsBody };
