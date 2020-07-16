/**
 * @param {string} prop 
 * @param {number} value 
 * @param {HTMLElement} elem 
 */
export default function parseRelativeVal(prop, value, elem) {
	const rect = elem.getBoundingClientRect();

	switch (prop) {
		case 'y': return (value / 100) * rect.height;
		case 'x':
		default: return (value / 100) * rect.width;
	}
}
