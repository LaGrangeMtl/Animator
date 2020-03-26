import { ELEM_TOP, ELEM_CENTER, ELEM_BOTTOM } from '../Constants';
import { screen } from '../utils/screen';

/**
 * @param {AnimatorRect} rect 
 * @param {string} when 
 */
export default function parseWhen(rect, when) {
	const parts = when.split('_');
	if (parts.length !== 2) throw new Error('Missing parameters in animation "when" (expects: ELEM_* | SCREEN_*)');

	let obj;
	switch (parts[0]) {
		default:
		case ELEM_TOP: obj = rect.top; break;
		case ELEM_CENTER: obj = rect.top + (rect.height / 2); break;
		case ELEM_BOTTOM: obj = rect.top + rect.height; break;
	}

	return obj - screen[parts[1]];
}
