import { describe, it, expect } from 'vitest';
import { updateRoute } from './router-actions';
import { Route } from '../../types/router-config';

describe('updateRoute', () => {
	it('should return an empty array if routes is not provided', () => {
		const result = updateRoute(undefined, undefined);
		expect(result).toEqual([]);
	});

	it('should return the routes array if newRoute is not provided', () => {
		const routes: Route[] = [
			{
				id: '1',
				description: '',
				path: '/home',
				pageKey: 'home',
				messages: {
					errorMessage: 'Error message 1',
				},
				children: [],
			},
			{
				id: '2',
				description: '',
				path: '/about',
				pageKey: 'about',
				messages: {
					errorMessage: 'Error message 2',
				},
				children: [],
			},
		];
		const result = updateRoute(undefined, routes);
		expect(result).toEqual(routes);
	});

	it('should update the route with the same id and return the updated routes array', () => {
		const routes: Route[] = [
			{
				children: [],
				id: '1',
				description: '',
				path: '/about',
				pageKey: 'about',
				messages: {
					errorMessage: 'Error message 1',
				},
			},
			{
				id: '2',
				description: '',
				path: '/about',
				pageKey: 'about',
				messages: {
					errorMessage: 'Error message 1',
				},
				children: [
					{
						children: undefined,
						id: '3',
						description: '',
						path: '/about',
						pageKey: 'about',
						messages: {
							errorMessage: 'Error message 1',
						},
					},
				],
			},
		];
		const newRoute = {
			children: undefined,
			id: '3',
			description: '',
			path: '/3',
			pageKey: '3',
			messages: {
				errorMessage: 'Error message 3',
			},
		};
		const expected = [
			{
				children: [],
				id: '1',
				description: '',
				path: '/about',
				pageKey: 'about',
				messages: {
					errorMessage: 'Error message 1',
				},
			},
			{
				id: '2',
				description: '',
				path: '/about',
				pageKey: 'about',
				messages: {
					errorMessage: 'Error message 1',
				},
				children: [newRoute],
			},
		];
		const result = updateRoute(newRoute, routes);
		expect(result).toEqual(expected);
	});
});
