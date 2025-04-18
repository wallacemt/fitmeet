import { z } from "zod";

export const definePreferencesSchema = z.object({
  typeIds: z.array(z.string().uuid()).min(1, "Deve conter pelo menos um ID de preferência."),
});
