import {
	toCSS,
	composeMultiple,
	translate,
	rotate,
	scale,
} from '../utils/CssMatrix';
import valueOrDefault from './valueOrDefault';

/**
 * @param {array} initialMatrix 
 * @param {object} values
 */
export default function matrix(initialMatrix, values) {
	if (
		values.rotation !== undefined
		|| values.scaleX !== undefined
		|| values.scaleY !== undefined
		|| values.x !== undefined
		|| values.y !== undefined
		|| values.z !== undefined
	) {
		values.transform = toCSS(composeMultiple([
			initialMatrix,
			translate(valueOrDefault(values.x), valueOrDefault(values.y), valueOrDefault(values.z)),
			rotate(valueOrDefault(values.rotation)),
			scale(valueOrDefault(values.scaleX, 1), valueOrDefault(values.scaleY, 1), valueOrDefault(values.scaleZ, 1)),
		]));
	}

	delete values.rotation;
	delete values.scaleX;
	delete values.scaleY;
	delete values.x;
	delete values.y;
	delete values.z;
	return values;
}
