import z from "zod";

const toggleManagerStatusSchema = {
	tags: ["Manager"],
	summary: "Toggle Manager Status",
	description: "Toggle Manager Status to 'active' or 'disabled'",
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

type TToggleManagerStatusParams = z.infer<
	typeof toggleManagerStatusSchema.params
>;

type TToggleManagerStatusBody = z.infer<typeof toggleManagerStatusSchema.body>;

export {
	toggleManagerStatusSchema,
	TToggleManagerStatusParams,
	TToggleManagerStatusBody,
};
