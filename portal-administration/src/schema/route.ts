import { z } from "zod";

export const route = z
  .object({
    path: z.string().min(1, "Please add path").max(50),
    pageKey: z
      .string()
      .min(2, "Please add pageKey, min 2 characters long")
      .max(50),
    messages: z.object({
      errorMessage: z
        .string()
        .min(1, "Please add Error Message")
        .max(200, "Error message to long."),
    }),
    description: z.string().optional(),
  })
  .passthrough();

export type RouteInput = z.infer<typeof route>;

export const rootInput = z.object({
  pageKey: z
    .string()
    .min(2, "Please add pageKey, min 2 characters long")
    .max(50),
});

export type RootInput = z.infer<typeof rootInput>;
