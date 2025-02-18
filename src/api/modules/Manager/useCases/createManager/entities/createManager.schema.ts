import z from "zod";
import { validateCpf } from "../../../../../utils/validateCpf";

const createManagerSchema = {
	tags: ["Manager"],
	summary: "Create Manager",
	description: "Register a new Manager into database.",
	needPermission: true,
	body: z.object({
		photo: z.string().nullish(),
		name: z
			.string({ required_error: "Name is required" })
			.min(3, { message: "Name must be at least 3 characters long" }),
		email: z
			.string({ required_error: "Email is required" })
			.email({ message: "Invalid email address" }),
		cpf: z
			.string({
				required_error: "O CPF é obrigatório.",
			})
			.min(14, "Invalid CPF.")
			.max(14, "Invalid CPF.")
			.refine(
				(val) => {
					if (val) {
						try {
							const cpf = val
								.split(".")
								.join("")
								.split("-")
								.join("");
							validateCpf(cpf);
							return true;
						} catch (e) {
							return false;
						}
					} else {
						return true;
					}
				},
				{
					message: "CPF fornecido é inválido.",
				},
			)
			.describe("000.000.000-00"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long"),
		phone: z.string().nullish().describe("(99) 99999-9999"),
		roleId: z.number(),
		birthday: z
			.string()
			.min(10, "Invalid Birthday.")
			.max(10, "Invalid Birthday.")
			.nullish()
			.refine(
				(val) => {
					if (val) {
						const [day, month, year] = val.split("/").map(Number);

						if (!day || !month || !year) {
							return false;
						}

						if (month > 12 || month < 1) {
							return false;
						}

						const currentYear = new Date().getFullYear();
						if (year > currentYear) {
							return false;
						}

						const isValidDate = (
							d: number | undefined,
							m: number,
							y: number,
						) => {
							const date = new Date(y, m - 1, d);
							return (
								date.getFullYear() === y &&
								date.getMonth() + 1 === m &&
								date.getDate() === d
							);
						};

						if (!isValidDate(day, month, year)) {
							return false;
						}

						return true;
					}
					return true; // If the value is null, it's valid
				},
				{ message: "Invalid birthday date." },
			)
			.describe("dd/mm/yyyy"),
		address: z.string().nullish(),
		permissions: z.array(z.string()),
	}),
	response: {
		201: z.null().describe("User created successfully"),
	},
};

type TCreateManagerBody = z.infer<typeof createManagerSchema.body>;

export { createManagerSchema, TCreateManagerBody };
