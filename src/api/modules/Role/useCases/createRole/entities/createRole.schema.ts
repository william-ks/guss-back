import z from "zod";

const createRoleSchema = {
	tags: ["Role"],
	summary: "Create Role",
	description: "Register a new Role into database.",
	needPermission: true,
	body: z.object({
		title: z.string().min(3, { message: "Please, min 3 letters." }),
		points: z
			.number()
			.min(1, { message: "The min of points is 1." })
			.max(99, { message: "The max of points is 99." }),
	}),
	response: {
		201: z.null(),
	},
};

type TCreateRoleBody = z.infer<typeof createRoleSchema.body>;

export { createRoleSchema, TCreateRoleBody };
