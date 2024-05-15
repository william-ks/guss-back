import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  office: z.string(),
});

export { createUserSchema };
