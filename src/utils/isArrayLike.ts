/**
 * Checks if the argument is array-like (has length property).
 * @param {*} argument - The argument to check.
 * @returns {boolean} Information if the argument is array-like.
 */
export const isArrayLike = (
	argument: unknown
): argument is unknown & { length: number } => {
	return Array.isArray(argument) || argument instanceof NodeList;
}
