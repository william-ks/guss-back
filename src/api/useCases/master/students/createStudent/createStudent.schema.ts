import { z } from "zod";

export const createStudentSchema = z.object({
  photo: z.string().min(10).nullable(),
  name: z.string({ required_error: "O nome é obrigatório." }).min(3).max(50),
  email: z.string({ required_error: "O email é obrigatório." }).email(),
  celphone: z.string().min(10).nullable(),
  cpf: z.string().min(11, "Inválid CPF.").max(11, "Inválid CPF.").nullable(),
  address: z.string().nullable(),
  birthday: z
    .string()
    .nullable()
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
      { message: "Data inválida." },
    ),
  class_time: z.string().nullable(),
});
