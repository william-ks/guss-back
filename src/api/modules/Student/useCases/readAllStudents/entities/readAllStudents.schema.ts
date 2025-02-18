import z from "zod";

const readAllStudentsSchema = {
	tags: ["Student", "Teacher"],
	summary: "Read All Students",
	description: "Read All Students",
	needPermission: true,
	response: {
		200: z
			.array(
				z.object({
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
			)
			.nullish(),
	},
};

export { readAllStudentsSchema };
