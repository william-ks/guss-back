import z from "zod";

const listAllPermissionsSchema = {
	tags: ["Permission"],
	summary: "List All",
	description: "List All permissions",
	needPermission: true,
	response: {
		200: z.array(
			z.object({
				id: z.number(),
				name: z.string(),
				code: z.string(),
				tags: z.array(z.string()),
			}),
		),
	},
};

export { listAllPermissionsSchema };
