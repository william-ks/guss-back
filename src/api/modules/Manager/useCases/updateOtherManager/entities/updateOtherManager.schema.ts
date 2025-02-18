import z from "zod";

const updateOtherManagerSchema = {
	tags: ["Manager"],
	summary: "Update Other Manager",
	description: "To add or remove permissions",
	needPermission: true,
	params: z.object({
		id: z.string().min(1, { message: "ID need to be valid" }),
	}),
	body: z.object({
		permissions: z
			.array(
				z.object({
					code: z.string(),
					toAdd: z.boolean(),
					toRemove: z.boolean(),
				}),
			)
			.nullish(),
		roleId: z.number().min(1).nullish(),
	}),
	response: {
		204: z.null().describe("Manager permissions updated"),
	},
};

type TUpdateOtherManagerBody = z.infer<typeof updateOtherManagerSchema.body>;
type TUpdateOtherManagerParams = z.infer<
	typeof updateOtherManagerSchema.params
>;

export {
	updateOtherManagerSchema,
	TUpdateOtherManagerBody,
	TUpdateOtherManagerParams,
};
