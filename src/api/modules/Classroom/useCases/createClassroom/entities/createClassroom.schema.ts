import z from "zod";

const createClassroomSchema = {
	tags: ["Classroom"],
	summary: "Create Classroom",
	description: "Register a new Classroom into database.",
	body: z.object({
		name: z.string().min(3).max(255),
		studentsIds: z.array(z.string().nullable()).nullable(),
		teacherId: z.number().nullish(),
		scheduleId: z.string().nullish(),
	}),
};

type TCreateClassroomBody = z.infer<typeof createClassroomSchema.body>;

export { createClassroomSchema, TCreateClassroomBody };
