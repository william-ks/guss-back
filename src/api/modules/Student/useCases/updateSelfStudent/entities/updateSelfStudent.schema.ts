import z from "zod";
import { validateCpf } from "../../../../../utils/validateCpf";

const updateSelfStudentSchema = {
	tags: ["Student"],
	summary: "Update Self Student",
	description:
		"Update Self Student, \n in this endpoint is possible update personal info, or password, but to update password is required send only password and to update others info send body whithout password.",
	body: z.object({
		name: z
			.string({ required_error: "Name is required" })
			.min(3, { message: "Name must be at least 3 characters long" })
			.nullish(),
		email: z
			.string({ required_error: "Email is required" })
			.email({ message: "Invalid email address" })
			.nullish(),
		cpf: z
			.string({
				required_error: "O CPF é obrigatório.",
			})
			.min(14, "Invalid CPF.")
			.max(14, "Invalid CPF.")
			.nullish()
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
		phone: z.string().nullish().nullish().describe("(99) 99999-9999"),
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

						const isValidDate = (d, m, y) => {
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
		password: z.string().nullish(),
	}),
	response: {
		204: z.null().describe("Updated Successfully"),
	},
};

type TUpdateSelfStudentBody = z.infer<typeof updateSelfStudentSchema.body>;

export { updateSelfStudentSchema, TUpdateSelfStudentBody };
