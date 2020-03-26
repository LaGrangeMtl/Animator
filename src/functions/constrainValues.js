import { constrain } from '../utils/constrain';
import Easings from '../utils/Easings';
import { map } from '../utils/map';

/**
 * @param {object} c 
 * @param {AnimatorProp} prop 
 */
export default function constrainValues(c, prop) {
	const constrained = constrain(prop.st, prop.startOffset, prop.endOffset);
	const prc = map(constrained, prop.startOffset, prop.endOffset, 0, 1);
	if (prop.ease) {
		c[prop.key] = Easings[prop.ease](prc, prop.startValue, prop.endValue - prop.startValue, 1);
	} else {
		c[prop.key] = map(constrained, prop.startOffset, prop.endOffset, prop.startValue, prop.endValue);
	}
	return c;
}
