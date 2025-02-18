import z from "zod";

const createLessonSchema = {
	tags: ["Lesson"],
	summary: "Create Lesson",
	description: "Register a new Lesson into database.",
	body: z.object({
		name: z.string().nonempty({ message: "Name is required" }),
		description: z.string().optional(),
		order: z.number().optional(),
		startAt: z.string().optional(),
		endAt: z.string().optional(),
		level: z.string().nonempty({ message: "Level is required" }),
		scheduleId: z.string().nonempty({ message: "Schedule is required" }),
	}),
	response: {
		201: z.null(),
	},
};

type TCreateLessonBody = z.infer<typeof createLessonSchema.body>;

export { createLessonSchema, TCreateLessonBody };
