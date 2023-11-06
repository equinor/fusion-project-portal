import { mutateArray } from './mutate-array';
import { it, describe, expect, beforeAll, vi } from 'vitest';

describe('mutateArray', () => {
	const sampleArray = [
		{ id: 1, name: 'Alice' },
		{ id: 2, name: 'Bob' },
		{ id: 3, name: 'Charlie' },
	];

	beforeAll(() => {
		console.warn = vi.fn();
	});

	it('should initialize correctly', () => {
		const result = mutateArray(sampleArray, 'id');

		expect(result.value).toEqual(sampleArray);
		expect(result.getValue()).toEqual(sampleArray);
	});

	it('should mutate the array correctly', () => {
		const result = mutateArray(sampleArray, 'id');

		const mutatedResult = result.mutate((dict) => {
			// Add a new item to the dictionary
			dict['4'] = { id: 4, name: 'David' };
			return dict;
		});

		const expectedMutatedArray = [...sampleArray, { id: 4, name: 'David' }];

		expect(mutatedResult.value).toEqual(expectedMutatedArray);
		expect(mutatedResult.getValue()).toEqual(expectedMutatedArray);
	});

	it('should handle errors in the mutation callback', () => {
		const result = mutateArray(sampleArray, 'id');

		const error = new Error('Some error');

		const mutatedResult = result.mutate(() => {
			throw error;
		});

		expect(console.warn).toHaveBeenCalledWith(error);

		expect(mutatedResult.value).toEqual(sampleArray);
		expect(mutatedResult.getValue()).toEqual(sampleArray);
	});
});
