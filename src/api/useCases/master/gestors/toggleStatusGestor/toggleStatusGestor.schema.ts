import { z } from "zod";

export const ToggleStatusGestorSchema = z.object({
  status: z.boolean(),
});
