import { z } from "zod";
import { passwordValidation } from "../../../functions/schema.refines";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
