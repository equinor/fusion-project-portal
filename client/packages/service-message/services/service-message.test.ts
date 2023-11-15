import { describe, beforeEach, it, expect } from 'vitest';
import { ServiceMessages } from './service-message';
import { AppReference, ServiceMessage } from '../types/types';

describe('ServiceMessages', () => {
	let serviceMessages: ServiceMessages;
	let initialMessages: ServiceMessage[];

	beforeEach(() => {
		initialMessages = [
			{
				id: '1',
				type: 'Info',
				title: 'Initial Message',
				content: 'This is an initial message',
				scope: 'App',
				relevantApps: [{ key: 'appKey', name: 'AppName', shortName: 'AN' }],
				timestamp: new Date('2023-01-01T12:00:00Z'),
				notifyUser: true,
			},
			{
				id: '2',
				type: 'Issue',
				title: 'Another Message',
				content: 'This is another message',
				scope: 'Portal',
				relevantPortals: [{ identifier: 'portal1' }],
				timestamp: new Date('2023-01-02T12:00:00Z'),
				notifyUser: false,
			},
		];

		serviceMessages = new ServiceMessages(initialMessages);
	});

	it('should be created', () => {
		expect(serviceMessages).toBeTruthy();
	});

	it('should update messages when next is called', () => {
		const newMessages: ServiceMessage[] = [
			{
				id: '3',
				type: 'Maintenance',
				title: 'Updated Message',
				content: 'This is an updated message',
				scope: 'App',
				relevantApps: [{ key: 'appKey', name: 'AppName', shortName: 'AN' }],
				timestamp: new Date(),
				notifyUser: true,
			},
		];

		serviceMessages.next(newMessages);

		serviceMessages.messages$.subscribe((messages) => {
			expect(messages).toEqual(newMessages);
		});
	});

	it('should filter appMessages based on appsFilter', () => {
		const appsFilter: string[] = ['appKey'];

		serviceMessages.registerAppsFilter(appsFilter);

		serviceMessages.appMessages$.subscribe((appMessages) => {
			expect(appMessages).toEqual([
				{
					key: 'appKey',
					name: 'AppName',
					shortName: 'AN',
					messages: [
						{
							id: '1',
							type: 'Info',
							title: 'Initial Message',
							content: 'This is an initial message',
							scope: 'App',
							relevantApps: [{ key: 'appKey', name: 'AppName', shortName: 'AN' }],
							timestamp: new Date('2023-01-01T12:00:00Z'),
							notifyUser: true,
						},
					],
				},
			]);
		});
	});

	it('should filter currentPortalAndAppMessages based on currentAppKey', () => {
		const newAppKey = 'newAppKey';

		serviceMessages.setCurrentApp(newAppKey);

		serviceMessages.currentPortalAndAppMessages$.subscribe((messages) => {
			expect(messages).toEqual([
				{
					id: '2',
					type: 'Issue',
					title: 'Another Message',
					content: 'This is another message',
					scope: 'Portal',
					relevantPortals: [{ identifier: 'portal1' }],
					timestamp: new Date('2023-01-02T12:00:00Z'),
					notifyUser: false,
				},
			]);
		});
	});

	it('should filter portalMessages based on portalsFilter', () => {
		const portalsFilter: string[] = ['portal1'];

		serviceMessages.registerPortalFilter(portalsFilter);

		serviceMessages.portal$.subscribe((portalMessages) => {
			expect(portalMessages).toEqual([
				{
					identifier: 'portal1',
					messages: [
						{
							id: '2',
							type: 'Issue',
							title: 'Another Message',
							content: 'This is another message',
							scope: 'Portal',
							relevantPortals: [{ identifier: 'portal1' }],
							timestamp: new Date('2023-01-02T12:00:00Z'),
							notifyUser: false,
						},
					],
				},
			]);
		});
	});

	it('should correctly map app messages using the types', () => {
		const appReference: AppReference = {
			key: 'appKey',
			name: 'AppName',
			shortName: 'AN',
		};

		const appMessages: ServiceMessage[] = [
			{
				id: '1',
				type: 'Info',
				title: 'Initial Message',
				content: 'This is an initial message',
				scope: 'App',
				relevantApps: [appReference],
				timestamp: new Date('2023-01-01T12:00:00Z'),
				notifyUser: true,
			},
			{
				id: '2',
				type: 'Issue',
				title: 'Another Message',
				content: 'This is another message',
				scope: 'Portal',
				relevantPortals: [{ identifier: 'portal1' }],
				timestamp: new Date('2023-01-02T12:00:00Z'),
				notifyUser: false,
			},
			{
				id: '3',
				type: 'Maintenance',
				title: 'Updated Message',
				content: 'This is an updated message',
				scope: 'Portal',
				relevantPortals: [{ identifier: 'portal1' }],
				timestamp: new Date('2023-01-02T12:00:00Z'),
				notifyUser: true,
			},
			{
				id: '4',
				type: 'Info',
				title: 'Another App Message',
				content: 'This is another app message',
				scope: 'App',
				relevantApps: [appReference],
				timestamp: new Date('2023-01-01T12:00:00Z'),
				notifyUser: true,
			},
		];

		serviceMessages.next(appMessages);

		expect(serviceMessages.appMessages).toEqual([
			{
				key: 'appKey',
				name: 'AppName',
				shortName: 'AN',
				messages: [
					{
						id: '1',
						type: 'Info',
						title: 'Initial Message',
						content: 'This is an initial message',
						scope: 'App',
						relevantApps: [appReference],
						timestamp: new Date('2023-01-01T12:00:00Z'),
						notifyUser: true,
					},
					{
						id: '4',
						type: 'Info',
						title: 'Another App Message',
						content: 'This is another app message',
						scope: 'App',
						relevantApps: [appReference],
						timestamp: new Date('2023-01-01T12:00:00Z'),
						notifyUser: true,
					},
				],
			},
		]);
	});
});
