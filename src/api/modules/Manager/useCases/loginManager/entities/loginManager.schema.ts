import z from "zod";

const loginManagerSchema = {
	tags: ["Manager"],
	summary: "Manager Login",
	description: "Manager Login",
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
				role: z.object({
					id: z.number(),
					title: z.string(),
					points: z.number(),
				}),
				primaryColor: z.string().nullish(),
				grayColor: z.string().nullish(),
				permissions: z.array(z.string().nullish()),
			}),
		}),
	},
};

type TLoginManagerBody = z.infer<typeof loginManagerSchema.body>;

export { loginManagerSchema, TLoginManagerBody };
