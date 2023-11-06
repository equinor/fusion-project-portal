/**
 * Mutate an array of objects into a dictionary-like structure, and provide a mechanism for safe mutations.
 *
 * @param array - An array of objects of type T to be converted into a dictionary.
 * @param key - The key in the objects of the array to use as the dictionary key.
 * @returns An object with the following properties:
 *   - `value` - An array of the original objects in the order they were provided.
 *   - `getValue` - A function that returns an array of the original objects in the same order.
 *   - `mutate` - A function to perform safe mutations on the dictionary.
 *
 * @typeparam T - The type of objects in the array.
 * @typeparam K - The type of the key used for dictionary entries.
 *
 * @example
 * const sampleArray = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' },
 * ];
 *
 * const result = mutateArray(sampleArray, 'id');
 *
 * // Access the original array of objects
 * const originalArray = result.value; // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
 *
 * // Access the original array using a function
 * const originalArrayFunction = result.getValue(); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
 *
 * // Mutate the dictionary using a callback
 * const mutatedResult = result.mutate((dict) => {
 *   dict['4'] = { id: 4, name: 'David' };
 *   return dict;
 * });
 */
export const mutateArray = <T, K extends keyof T>(array: T[], key: K) => {
	const dictionary: Record<string, T> = array.reduce((acc, item) => {
		const itemKey = item[key];
		if (typeof itemKey === 'object') {
			acc[JSON.stringify(itemKey)] = item;
		} else {
			acc[String(itemKey)] = item;
		}
		return acc;
	}, {} as Record<string, T>);

	const mutate = (cb: (dict: Record<string, T>) => Record<string, T> | void) => {
		try {
			const mutatedDictionary = cb(dictionary);
			return mutateArray(Object.values(mutatedDictionary || dictionary) as T[], key);
		} catch (error) {
			console.warn(error);
			return mutateArray(Object.values(dictionary), key);
		}
	};

	return {
		value: Object.values(dictionary) as T[],
		getValue: () => Object.values(dictionary) as T[],
		mutate,
	};
};
