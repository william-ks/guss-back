import z from "zod";

const readAllManagersSchema = {
	tags: ["Manager"],
	summary: "Read All Managers",
	description: "Read All Managers",
	needPermission: true,
	response: {
		200: z.array(
			z.object({
				publicId: z.string(),
				photo: z.string(),
				name: z.string(),
				email: z.string().email(),
				cpf: z.string(),
				phone: z.string().nullish(),
				birthday: z.string().nullish(),
				address: z.string().nullish(),
				roleId: z.number(),
				permissions: z.array(z.string()), // Deve ser um array de strings
				isDefaultPassword: z.boolean(),
				isActive: z.boolean(),
				createdAt: z.date(),
				updatedAt: z.date(), // Deve ser string
				role: z.object({
					id: z.number(),
					title: z.string(),
				}),
				classes: z.array(z.object({}).passthrough()).nullish(), // Aceita array de objetos ou null
			}),
		),
	},
};

export { readAllManagersSchema };
