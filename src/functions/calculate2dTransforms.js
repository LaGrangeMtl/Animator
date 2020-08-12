import valueOrDefault from './valueOrDefault';

/**
 * @typedef {object} RawTransforms
 * @property {number} tx
 * @property {number} ty
 * @property {number} sx
 * @property {number} sy
 * @property {number} r
 */

function getValueOrDefaults(values) {
	return {
		tx: valueOrDefault(values.x, 0),
		ty: valueOrDefault(values.y, 0),
		rot: valueOrDefault(values.rotation, 0),
		sx: valueOrDefault(values.scaleX, 1),
		sy: valueOrDefault(values.scaleY, 1),
	};
}

function hasValues(values) {
	return (
		values.rotation !== undefined
		|| values.scaleX !== undefined
		|| values.scaleY !== undefined
		|| values.x !== undefined
		|| values.y !== undefined
		|| values.z !== undefined
	);
}

/**
 * @param {object} values 
 * @param {Boolean} raw 
 * @returns {object}
 */
function transform2d(values) {
	if (hasValues) {
		const {
			tx, ty, rot, sx, sy,
		} = getValueOrDefaults(values);

		const t = `translate(${tx}px, ${ty}px)`;
		const r = `rotate(${rot}deg)`;
		const s = `scale(${sx}, ${sy})`;

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

/**
 * @param {*} values
 * @returns {RawTransforms}
 */
function transform2dRaw(values) {
	if (hasValues) {
		const {
			tx, ty, rot, sx, sy,
		} = getValueOrDefaults(values);

		const t = `translate(${tx}px, ${ty}px)`;
		const r = `rotate(${rot}deg)`;
		const s = `scale(${sx}, ${sy})`;

		values.transform = `${t} ${r} ${s}`;

		return {
			tx,
			ty,
			sx,
			sy,
			r: rot,
		};
	}

	return getValueOrDefaults({});
}

export { transform2d, transform2dRaw };
