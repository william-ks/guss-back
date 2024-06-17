import { z } from "zod";

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "O E-mail é obrigatório." })
    .email({ message: "Email inválido" }),
  password: z.string({ required_error: "A senha é obrigatória." }),
});
