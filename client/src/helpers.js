/**
 * Parses a Date object into a string representing the current date in MM/DD/YYY format
 * @returns {String} a string representing the current date
 */
export function constructDate() {
	let today = new Date();
	let month = today.getMonth() + 1;
	let date = today.getDate();
	let year = today.getFullYear();

	return `${month}/${date}/${year}`;
}
