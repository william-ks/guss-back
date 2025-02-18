import z from "zod";

const readOneStudentSchema = {
	tags: ["Student", "Teacher"],
	summary: "Read One Student",
	description: "Read One Student",
	needPermission: true,
	params: z.object({
		id: z.string(),
	}),
	response: {
		200: z.object({
			publicId: z.string(),
			photo: z.string(),
			name: z.string(),
			email: z.string().email(),
			cpf: z.string(),
			description: z.string().nullish(),
			isActive: z.boolean(),
			phone: z.string().nullish(),
			birthday: z.string().nullish(),
			createdAt: z.date(),
			updatedAt: z.date(),
		}),
	},
};

type TReadOneStudentParams = z.infer<typeof readOneStudentSchema.params>;

export { readOneStudentSchema, TReadOneStudentParams };
