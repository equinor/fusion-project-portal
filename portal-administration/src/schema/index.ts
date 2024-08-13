import * as z from "zod";
export const contextTypeSchema = z
  .object({
    type: z
      .string()
      .min(3, "Context type description must contain at least 3 character(s)")
      .max(30),
  })
  .required();

export type ContextTypeInputs = z.infer<typeof contextTypeSchema>;

export const portalInputSchema = z.object({
  name: z
    .string()
    .min(3, "Short description must contain at least 3 character(s)")
    .max(50),
  shortName: z
    .string()
    .min(3, "Short Name must contain at least 3 character(s)")
    .max(150, "Short Name can contain at most 300 character(s)"),
  subtext: z
    .string()
    .min(3, "Short Name must contain at least 3 character(s)")
    .max(150, "Short Name can contain at most 300 character(s)"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 character(s)")
    .max(300, "Description can contain at most 300 character(s)"),
  context: z.array(contextTypeSchema.optional()).optional(),
});

export const portalContextInputSchema = z.object({
  context: z.array(contextTypeSchema.optional()).optional(),
});

export type PortalInputs = z.infer<typeof portalInputSchema>;
