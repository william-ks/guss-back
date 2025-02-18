import z from "zod";

const loginStudentSchema = {
	tags: ["Student"],
	summary: "Login Student",
	description: "Login Student",
	body: z.object({
		email: z
			.string({ required_error: "The E-mail is required." })
			.email({ message: "Invalid E-mail" }),
		password: z.string({ required_error: "The password is required." }),
	}),
	response: {
		200: z.object({
			user: z.object({
				id: z.string(),
				name: z.string(),
				photo: z.string(),
				email: z.string(),
				primaryColor: z.string().nullish(),
				grayColor: z.string().nullish(),
				theme: z.string().nullish(),
			}),
		}),
	},
};

type TLoginStudentBody = z.infer<typeof loginStudentSchema.body>;

export { loginStudentSchema, TLoginStudentBody };
