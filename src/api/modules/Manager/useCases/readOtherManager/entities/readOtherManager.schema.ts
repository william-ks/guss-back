import z from "zod";

const readOtherManagerSchema = {
	tags: ["Manager"],
	summary: "Read Other Manager",
	description: "Read Other Manager",
	needPermission: true,
	params: z.object({
		id: z.string().min(1, { message: "id need to be valid" }),
	}),
	responses: {
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
			role: z.object({
				id: z.number(),
				title: z.string(),
			}),
			classes: z.array(z.object({}).passthrough()).nullish(), // Aceita array de objetos ou null
		}),
	},
};

type TReadOtherManagerParams = z.infer<typeof readOtherManagerSchema.params>;

export { readOtherManagerSchema, TReadOtherManagerParams };
