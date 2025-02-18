import z from "zod";

const toggleStudentStatusSchema = {
	tags: ["Student", "Teacher", "Manager"],
	summary: "Toggle Student Status",
	description: "Toggle Student Status to 'active' or 'disabled'",
	needPermission: true,
	params: z.object({
		id: z.string().min(1, { message: "id need to be valid" }),
	}),
	body: z.object({
		status: z.boolean().describe("New Status true = active"),
	}),
	response: {
		204: z.null().describe("Success"),
	},
};

type TToggleStudentStatusBody = z.infer<typeof toggleStudentStatusSchema.body>;
type TToggleStudentStatusParams = z.infer<
	typeof toggleStudentStatusSchema.params
>;

export {
	toggleStudentStatusSchema,
	TToggleStudentStatusBody,
	TToggleStudentStatusParams,
};
