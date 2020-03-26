import transform2d from './transform2d';
import transformValues from './transformValues';
import { isIdentity2d } from '../utils/CssMatrix';

/**
 * @param {HTMLElement} el 
 * @param {Number} st 
 */
export default function calculate2dTransforms(el, st) {
	const v = transform2d(transformValues(el, st));
	if (v.transform && el.initialMatrix && !isIdentity2d(el.initialMatrix)) {
		const [a, b, c, d, tx, ty] = el.initialMatrix;

		const scaleX = Math.sign(a) * Math.sqrt((a * a) + (b * b));
		const scaleY = Math.sign(d) * Math.sqrt((c * c) + (d * d));
		const rotation = Math.atan2(-b, a);

		v.transform += ' ' + transform2d({
			scaleX,
			scaleY,
			rotation,
			x:
			tx,
			y: ty,
		}).transform;
	}

	return v;
}
