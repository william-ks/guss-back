import { z } from "zod";

export const ToggleStatusManagerSchema = z.object({
  status: z.boolean(),
});
