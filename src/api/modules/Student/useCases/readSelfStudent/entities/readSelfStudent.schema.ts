import z from "zod";

const readSelfStudentSchema = {
	tags: ["Student"],
	summary: "Read Self Student",
	description: "Read Self Student",
	response: {
		200: z.object({
			publicId: z.string(),
			photo: z.string(),
			name: z.string(),
			email: z.string().email(),
			cpf: z.string(),
			phone: z.string().nullish(),
			birthday: z.string().nullish(),
			primaryColor: z.string().nullish(),
			grayColor: z.string().nullish(),
			theme: z.string().nullish(),
			createdAt: z.date(),
			updatedAt: z.date(),
		}),
	},
};

export { readSelfStudentSchema };
