import z from "zod";

const readAllRolesSchema = {
	tags: ["Role"],
	summary: "Read All Roles",
	description: "Read All Roles",
	needPermission: true,
	response: {
		200: z.array(
			z
				.object({
					id: z.number(),
					title: z.string(),
					points: z.number(),
				})
				.nullish(),
		),
	},
};

export { readAllRolesSchema };
