import { z } from "zod";
import { validateCpf } from "../../../../composables/validateCpf";

export const createManagerSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  email: z
    .string({ required_error: "O E-mail é obrigatório" })
    .email({ message: "Email inválido" }),
  roleId: z
    .number({
      required_error: "O ID de cargo 'roleId' é obrigatório.",
    })
    .min(1)
    .max(10),
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
            const cpf = val.split(".").join("").split("-").join("");
            // validateCpf(cpf);
            return true;
          } catch (e) {
            return false;
          }
        }
      },
      {
        message: "CPF fornecido é inválido.",
      },
    ),
  address: z.string().nullish(),
  birthday: z
    .string()
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
    ),
  permissions: z.array(z.number().int()),
});
