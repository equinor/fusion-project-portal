import * as z from 'zod';
export const contextTypeSchema = z.object({
	type: z.string().min(3, 'Context type description must contain at least 3 character(s)').max(30),
});

export type ContextTypeInputs = z.infer<typeof contextTypeSchema>;

const base = {
	name: z.string().min(3, 'Short description must contain at least 3 character(s)').max(50),
	shortName: z
		.string()
		.min(2, 'Short Name must contain at least 2 character(s)')
		.max(150, 'Short Name can contain at most 300 character(s)'),
	subtext: z
		.string()
		.min(3, 'Short Name must contain at least 3 character(s)')
		.max(150, 'Short Name can contain at most 300 character(s)'),
	description: z.string().max(500, 'Description can contain at most 300 character(s)').optional(),
	icon: z.string().default(''),
};

export const portalInputSchema = z.object({
	...base,
	contextTypes: z.array(z.string()),
});

export const portalEditInputSchema = z.object({
	...base,
	id: z.string().uuid().optional(),
	contextTypes: z.array(z.string()).optional(),
});

export type PortalCreateInputs = z.infer<typeof portalInputSchema>;
export type PortalInputs = z.infer<typeof portalEditInputSchema>;
