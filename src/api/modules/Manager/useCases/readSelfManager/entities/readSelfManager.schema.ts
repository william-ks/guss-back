import z from "zod";

const readSelfManagerSchema = {
	tags: ["Manager", "Teacher"],
	summary: "Read Self Manager",
	description: "Read Self Manager",
	needPermission: true,
	response: {
		200: z.object({
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
			primaryColor: z.string().nullish(),
			grayColor: z.string().nullish(),
			theme: z.string().nullish(),
			role: z.object({
				id: z.number(),
				title: z.string(),
				points: z.number(),
			}),
		}),
	},
};

export { readSelfManagerSchema };
