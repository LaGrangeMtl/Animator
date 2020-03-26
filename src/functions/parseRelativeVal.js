/**
 * @param {string} prop 
 * @param {number} value 
 * @param {HTMLElement} elem 
 */
export default function parseRelativeVal(prop, value, elem) {
	switch (prop) {
		case 'y': return (value / 100) * elem.clientHeight;
		case 'x':
		default: return (value / 100) * elem.clientWidth;
	}
}
