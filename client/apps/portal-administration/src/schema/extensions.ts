import { menu } from '@equinor/eds-icons';
import { z } from 'zod';

export const contextBreadCrumb = z.object({
	label: z.string().min(1, 'Please add BreadCrumb Label'),
	type: z.string().min(1, 'Please Select Context Type'),
	url: z.string().min(1, 'Please add URL'),
});

export const breadCrumbsConfiguration = z
	.object({
		enabled: z.boolean().default(false),
		config: z
			.object({
				context: z.array(contextBreadCrumb).default([]),
			})
			.optional(),
	})
	.refine(
		(data) => {
			return data.enabled !== true || data.config !== undefined;
		},
		{
			message: "Config is required when 'enabled' is true",
			path: ['config'],
		}
	);

export type BreadCrumbsConfiguration = z.infer<typeof breadCrumbsConfiguration>;

export const quickNavigation = z
	.object({
		enabled: z.boolean().default(false),
		config: z
			.object({
				links: z.array(
					z.object({
						label: z.string().min(1, 'Please add Link Label'),
						url: z.string().min(1, 'Please add URL'),
						icon: z.string(),
					})
				),
			})
			.optional(),
	})
	.refine(
		(data) => {
			return data.enabled !== true || data.config !== undefined;
		},
		{
			message: "Config is required when 'enabled' is true",
			path: ['config'],
		}
	);

export type QuickNavigation = z.infer<typeof quickNavigation>;

export const bookmarksConfig = z
	.object({
		enabled: z.boolean(),
		config: z
			.object({
				subSystem: z.object({
					subSystem: z.string().min(1, 'Please add SubSystem'),
					identifier: z.string().min(1, 'Please add SubSystem'),
					name: z.string().min(1, 'Please add SubSystem'),
				}),
				filterByApp: z.boolean().default(false),
			})
			.optional(),
	})
	.refine(
		(data) => {
			return data.enabled !== true || data.config !== undefined;
		},
		{
			message: "Config is required when 'enabled' is true",
			path: ['config'],
		}
	);

export type Bookmarks = z.infer<typeof bookmarksConfig>;

export const serviceMessage = z
	.object({
		enabled: z.boolean().default(true),
		config: z
			.object({
				portalIdentifier: z.string().min(1, 'Please add postal identifier'),
				scopeBySystem: z.boolean().default(false),
			})
			.optional(),
	})
	.refine(
		(data) => {
			return data.enabled !== true || data.config !== undefined;
		},
		{
			message: "Config is required when 'enabled' is true",
			path: ['config'],
		}
	);

export type ServiceMessage = z.infer<typeof serviceMessage>;

export const menuTypes = ['MegaMenu', 'Default', 'Custom'] as const;

export const menuConfig = z
	.object({
		enabled: z.boolean().default(true),
		config: z
			.object({
				type: z.enum(menuTypes).default('MegaMenu'),
				widgetId: z.string().optional(),
			})
			.refine(
				(data) => {
					return data.type !== 'Custom' || (data.widgetId !== undefined && data.widgetId !== '');
				},
				{
					message: "widgetId is required when type is 'Custom'",
					path: ['widgetId'],
				}
			)
			.optional(),
	})
	.refine(
		(data) => {
			return data.enabled !== true || data.config !== undefined;
		},
		{
			message: "Config is required when 'enabled' is true",
			path: ['config'],
		}
	);

export const extensionsConfig = z
	.object({
		breadCrumbsConfiguration: breadCrumbsConfiguration.default({
			enabled: false,
		}),
		quickNavigation: quickNavigation.default({
			enabled: false,
		}),
		bookmarks: bookmarksConfig.default({
			enabled: false,
		}),
		serviceMessage: serviceMessage.default({
			enabled: false,
		}),
		menu: menuConfig.default({
			enabled: true,
			config: {
				type: 'MegaMenu',
			},
		}),
	})
	.passthrough();

export type ExtensionsConfig = z.infer<typeof extensionsConfig>;
