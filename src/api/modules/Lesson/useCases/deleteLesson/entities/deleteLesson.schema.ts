import z from "zod";

const deleteLessonSchema = {
	tags: ["Lesson"],
	summary: "DeleteLesson",
	description: "DeleteLesson",
	params: z.object({
		id: z.string().min(1, { message: "ID need to be valid" }),
	}),
	response: {
		204: z.null(),
	},
};

type TDeleteLessonParams = z.infer<typeof deleteLessonSchema.params>;

export { deleteLessonSchema, TDeleteLessonParams };
