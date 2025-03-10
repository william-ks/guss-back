import z from "zod";

const createScheduleSchema = {
	tags: ["Schedule"],
	summary: "Create Schedule",
	description: "Register a new Schedule into database.",
	body: z.object({
		name: z
			.string()
			.min(3, { message: "Name must be at least 3 characters long" })
			.max(255, { message: "Name must be at most 255 characters long" }),
		description: z.string().nullable().optional(),
		isDefault: z.boolean().optional(),
	}),
	response: {
		201: z.null().describe("Created"),
	},
};

type TCreateScheduleBody = z.infer<typeof createScheduleSchema.body>;

export { createScheduleSchema, TCreateScheduleBody };
