import valueOrDefault from './valueOrDefault';

/**
 * @param {object} values
 */
export default function transform2d(values) {
	if (
		values.rotation !== undefined
		|| values.scaleX !== undefined
		|| values.scaleY !== undefined
		|| values.x !== undefined
		|| values.y !== undefined
		|| values.z !== undefined
	) {
		const t = `translate(${valueOrDefault(values.x, 0)}px, ${valueOrDefault(values.y, 0)}px)`;
		const r = `rotate(${valueOrDefault(values.rotation, 0)}deg)`;
		const s = `scale(${valueOrDefault(values.scaleX, 1)}, ${valueOrDefault(values.scaleY, 1)})`;

		values.transform = `${t} ${r} ${s}`;
	}
	
	delete values.rotation;
	delete values.scaleX;
	delete values.scaleY;
	delete values.x;
	delete values.y;
	delete values.z;
	return values;
}
