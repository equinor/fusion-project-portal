import * as z from 'zod';

export const inputSchema = z
	.object({
		shortDescription: z.string().min(3, 'Short description must contain at least 3 character(s)').max(50),
		description: z
			.string()
			.min(3, 'Description must contain at least 3 character(s)')
			.max(300, 'Description can contain at most 300 character(s)'),
		files: z.any().nullable(),
	})
	.required();

export type Inputs = z.infer<typeof inputSchema>;
