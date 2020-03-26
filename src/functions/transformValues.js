import constrainValues from './constrainValues';
import precision from './precision';
/**

 * @param {AnimatorElement} el
 * @param {number} st
 */
export default function transformValues(el, st) {
	return el.keys.map((propKey) => {
		return {
			st,
			ease: el.ease,
			key: propKey,
			...el.keyframes[propKey]
				.reduce((propCarry, propVal, i) => {
					const [offset, value] = propVal;

					switch (i) {
						case 0: 
							propCarry.startOffset = offset;
							propCarry.startValue = value;
							break;
						case 1:
						default:
							propCarry.endOffset = offset;
							propCarry.endValue = value;
							break;
					}
					
					return propCarry;
				}, {}),
		};
	}).reduce(constrainValues, {});
}
