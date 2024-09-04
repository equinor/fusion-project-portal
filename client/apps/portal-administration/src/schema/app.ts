import { z } from "zod";

export const onboardAppInput = z.object({
  appKey: z.string().min(1, "Please Select application from the list").max(50),
  contextTypes: z.array(z.string()),
});

export type OnboardAppInputs = z.infer<typeof onboardAppInput>;
