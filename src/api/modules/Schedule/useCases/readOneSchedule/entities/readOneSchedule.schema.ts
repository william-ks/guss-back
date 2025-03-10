import z from "zod";

const readOneScheduleSchema = {
	tags: ["Schedule"],
	summary: "ReadOneSchedule",
	description: "ReadOneSchedule",
	params: z.object({
		id: z.string().min(1, { message: "id need to be valid" }),
	}),
};

type TReadOneScheduleParams = z.infer<typeof readOneScheduleSchema.params>;

export { readOneScheduleSchema, TReadOneScheduleParams };
