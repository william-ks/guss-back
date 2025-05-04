import z from "zod";

const readOneClassroomSchema = {
	tags: ["Classroom"],
	summary: "Read One Classroom",
	description: "Read One Classroom",
	params: z.object({
		id: z.string().min(1, { message: "id need to be valid" }),
	}),
};

type TReadOneClassroomParams = z.infer<typeof readOneClassroomSchema.params>;

export { readOneClassroomSchema, TReadOneClassroomParams };
