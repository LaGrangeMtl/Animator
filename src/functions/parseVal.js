import parseRelativeVal from './parseRelativeVal';

/**
 * @param {string} prop 
 * @param {string} value 
 * @param {HTMLElement} elem 
 */
export default function parseVal(prop, value, elem) {
	if (typeof value === 'number') return value;

	const matches = value.match(/([-0-9.]+)(.+)/);
	const val = parseFloat(matches[1]);
	const unit = matches[2];

	switch (unit) {
		case 'vh': return (val / 100) * window.innerHeight;
		case 'vw': return (val / 100) * window.innerWidth;
		case 'px': return val;
		case '%':
		default: return parseRelativeVal(prop, val, elem);
	}
}
