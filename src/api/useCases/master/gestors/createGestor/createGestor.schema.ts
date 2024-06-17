import { z } from "zod";

const createGestorSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  email: z
    .string({ required_error: "O E-mail é obrigatório" })
    .email({ message: "Email inválido" }),
  officeId: z.string({
    required_error: "O ID de cargo 'officeId' é obrigatório.",
  }),
});

export { createGestorSchema as createUserSchema };
