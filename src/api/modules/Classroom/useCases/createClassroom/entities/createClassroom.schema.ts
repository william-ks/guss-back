import z from "zod";

const createClassroomSchema = {
	tags: ["Classroom"],
	summary: "Create Classroom",
	description: "Register a new Classroom into database.",
	body: z.object({
		name: z.string().min(3).max(255),
		studentsIds: z.array(z.number()),
		teacherId: z.number(),
		classSchedule: z.string().optional(),
	}),
	response: {
		201: z.null(),
	},
};

type TCreateClassroomBody = z.infer<typeof createClassroomSchema.body>;

export { createClassroomSchema, TCreateClassroomBody };
