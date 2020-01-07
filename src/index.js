//@ts-check

// import 'core-js/fn/array/find';

import { elemGuid } from './utils/guid';
import Ease from './utils/Easings';
import {
	scale,
	rotate,
	translate,
	toCSS,
	fromString,
	identity,
	composeMultiple,
	matrix2dto3d,
} from './utils/CssMatrix';
import { constrain } from './utils/constrain';
import { map } from './utils/map';

/**
 * @typedef {object} AnimatorElement
 * @property {HTMLElement} context
 * @property {string} ease
 * @property {array} initialMatrix
 * @property {object} keyframes
 * @property {array} keys
 * @property {HTMLElement} node
 */

/**
 * @typedef {object} AnimatorProp
 * @property {string} ease
 * @property {number} endOffset
 * @property {number} endValue
 * @property {string} key
 * @property {number} st
 * @property {number} startOffset
 * @property {number} startValue
 */

/**
 * @typedef {object} AnimatorRect
 * @property {number} top
 * @property {number} height
 */

export const ELEM_BOTTOM = 'eb';
export const ELEM_TOP = 'et';
export const ELEM_CENTER = 'ec';

export const SCREEN_BOTTOM = 'sb';
export const SCREEN_TOP = 'st';
export const SCREEN_CENTER = 'sc';

const instances = [];

export function updateAll() {
	instances.forEach((instance) => {
		instance.updateElements();
	});
}

const updateScreen = () => {
	screen = {
		[SCREEN_TOP]: 0,
		[SCREEN_CENTER]: (window.innerHeight / 2),
		[SCREEN_BOTTOM]: window.innerHeight,
	};
};

function valueOrDefault(value, defaultValue = 0) {
	return value !== undefined ? value : defaultValue;
}

let screen;
updateScreen();

// @ts-ignore
window.__animators = instances; //eslint-disable-line

export function Animator() {
	let animations = [];
	let elements = [];
	let contexts = [];

	const handlerDictionnary = {};
	const loopDictionnary = {};
	const lastValuesDictionnary = {};
	const animatorTopDictionnary = {};

	instances.push(this);

	/**
	 * @param {Element} context 
	 */
	function getContextScrollTop(context) {
		let ctx = context;
		if (context.tagName === 'HTML') ctx = document.scrollingElement || context;
		return ctx.scrollTop;
	}

	/**
	 * @param {HTMLElement} context 
	 * @param {AnimatorRect} rect 
	 * @param {string} when 
	 */
	function parseWhen(context, rect, when) {
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

	/**
	 * @param {string} prop 
	 * @param {number} value 
	 * @param {HTMLElement} elem 
	 */
	function parseRelativeVal(prop, value, elem) {
		switch (prop) {
			case 'y': return (value / 100) * elem.clientHeight;
			case 'x':
			default: return (value / 100) * elem.clientWidth;
		}
	}

	/**
	 * @param {string} prop 
	 * @param {string} value 
	 * @param {HTMLElement} elem 
	 */
	function parseVal(prop, value, elem) {
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

	/**
	 * @param {HTMLElement} context 
	 * @param {HTMLElement} elem 
	 * @param {AnimatorRect} rect 
	 * @param {string} animationId 
	 * @param {object} props 
	 * @param {HTMLElement} child
	 */
	function getKeyframes(context, elem, rect, animationId, props = null, child = null) {
		let animation = animations[animationId];

		if (props) {
			animation = props;
		} else if (animation && !Array.isArray(animation)) {
			animation = animation.props;
		}

		if (!animation) return {};
		return animation.reduce((c, anim) => {
			let values = { ...anim };
			delete values.when;
			values = Object.keys(values).map(key => [key, anim[key]]);
			const from = parseWhen(context, rect, anim.when);

			return values.reduce((c2, value) => {
				const [key, val] = value;
				c2[key] = c[key] || [];
				c2[key].push([from, parseVal(key, val, child || elem)]);
				return c2;
			}, c);
		}, {});
	}

	/**
	 * @param {HTMLElement} context 
	 * @param {HTMLElement} elem 
	 * @returns {AnimatorRect}
	 */
	function getRect(context, elem) {
		const style = elem.getAttribute('style');
		elem.setAttribute('style', '');
		const { top, height } = elem.getBoundingClientRect();
		const st = getContextScrollTop(context);
		const id = elemGuid(context);
		elem.setAttribute('style', style);

		return {
			top: (top - animatorTopDictionnary[id]) + st,
			height,
		};
	}

	/**
	 * @param {HTMLElement} elem 
	 */
	function getContext(elem) {
		let context = null;
		let el = elem;

		while (el.parentElement && !context) {
			el = el.parentElement;
			if (el.getAttribute('data-scrollbar') || el.getAttribute('data-scrollbar') === '') {
				context = el;
			}
		}
		if (!contexts.find(ctx => context === ctx)) {
			const id = elemGuid(context);
			animatorTopDictionnary[id] = el.getBoundingClientRect().top + el.scrollTop;
			contexts.push(context);
		}
		return context;
	}

	/**
	 * @param {object} c 
	 * @param {AnimatorProp} prop 
	 */
	function constrainValues(c, prop) {
		const constrained = constrain(prop.st, prop.startOffset, prop.endOffset);
		const prc = map(constrained, prop.startOffset, prop.endOffset, 0, 1);
		if (prop.ease) {
			c[prop.key] = Ease[prop.ease](prc, prop.startValue, prop.endValue - prop.startValue, 1);
		} else {
			c[prop.key] = map(constrained, prop.startOffset, prop.endOffset, prop.startValue, prop.endValue);
		}
		return c;
	}

	/**
	 * @param {AnimatorElement} el
	 * @param {number} st
	 */
	function transformValues(el, st) {
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

	/**
	 * @param {string} id
	 * @param {object} values 
	 */
	const hasChanged = (id, values) => {
		if (!lastValuesDictionnary[id]) return true;
		return lastValuesDictionnary[id] !== JSON.stringify(values);
	};

	/**
	 * @param {HTMLElement} ctx 
	 */
	const scroll = (ctx) => {
		const id = elemGuid(ctx);
		const st = getContextScrollTop(ctx);
		if (loopDictionnary[id]) {
			cancelAnimationFrame(loopDictionnary[id]);
		}
		
		loopDictionnary[id] = requestAnimationFrame(() => {
			update(ctx, st);
		});
	};

	/**
	 * @param {array} initialMatrix 
	 * @param {object} values
	 */
	function matrix(initialMatrix, values) {
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


	/**
	 * @param {object} values
	 */
	function transform2d(values) {
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

	/**
	 * @param {HTMLElement} ctx 
	 * @param {number} st 
	 */
	function update(ctx, st) {
		elements.forEach((el) => {
			if (el.context !== ctx || Object.keys(el.keyframes).length === 0) return;
			
			const isSVG = ~el.node.namespaceURI.indexOf('svg');
			let values = null;
			if (isSVG) {
				values = transform2d(transformValues(el, st));
			} else if (el.is3DMatrix || (el.initialMatrix && el.initialMatrix.length === 16)) {
				values = matrix(el.initialMatrix, transformValues(el, st));
			} else {
				values = transform2d(transformValues(el, st));
				if (values.transform && el.initialMatrix) {
					const [a, b, c, d, tx, ty] = el.initialMatrix;

					const scaleX = Math.sign(a) * Math.sqrt((a * a) + (b * b));
					const scaleY = Math.sign(d) * Math.sqrt((c * c) + (d * d));
					const rotation = Math.atan2(-b, a);

					values.transform += ' ' + transform2d({
						scaleX,
						scaleY,
						rotation,
						x:
						tx,
						y: ty,
					}).transform;
				}
			}

			const id = elemGuid(el.node);
			if (hasChanged(id, values)) {
				Object.assign(el.node.style, values);
				lastValuesDictionnary[id] = JSON.stringify(values);
			}
		});
	}

	/**
	 * @param {HTMLElement} elem 
	 */
	function getInitialMatrix(elem, is3D = false) {
		const prev = elem.style.transform;
		elem.style.transform = '';
		const transform = window.getComputedStyle(elem).getPropertyValue('transform');
		elem.style.transform = prev;
		
		if (transform === 'none') return null;

		let m = fromString(transform);
		m = (m.length < 16 && is3D) ? matrix2dto3d(m) : m;
		
		return m;
	}

	/**
	 * @param {string} animationId 
	 */
	function getEase(animationId) {
		return (animations[animationId] && animations[animationId].ease) || null;
	}

	/**
	 * @param {string} animationId 
	 */
	function is3DMatrix(animationId) {
		return (animations[animationId] && animations[animationId].force3d) || false;
	}

	/**
	 * @param {HTMLElement} context 
	 * @param {HTMLElement} elem 
	 * @param {AnimatorRect} rect 
	 * @param {string} animationId 
	 */
	function getChildren(context, elem, rect, animationId) {
		if (Array.isArray(animations[animationId])) {
			return [];
		}
		
		const children = (animations[animationId] && animations[animationId].children) || [];

		return children.reduce((c, anim) => {
			const arr = Array.from(elem.querySelectorAll(anim.selector));
			
			arr.forEach((el) => {
				const keyframes = getKeyframes(context, elem, rect, null, anim.props, el);
				
				c.push({
					node: el,
					parent: elem,
					context,
					ease: anim.ease,
					is3DMatrix: is3DMatrix(animationId),
					keyframes,
					keys: Object.keys(keyframes),
					initialMatrix: getInitialMatrix(el, is3DMatrix(animationId)),
				});
			});
			return c;
		}, []);
	}

	/**
	 * @param {array} list 
	 * @param {HTMLElement} elem 
	 */
	function parseElements(list, elem) {
		const context = getContext(elem);
		const animationId = elem.getAttribute('data-animator-id');

		const rect = getRect(context, elem);

		elemGuid(elem);

		const keyframes = getKeyframes(context, elem, rect, animationId);

		const props = {
			node: elem,
			context,
			is3DMatrix: is3DMatrix(animationId),
			ease: getEase(animationId),
			keyframes,
			keys: Object.keys(keyframes),
			initialMatrix: getInitialMatrix(elem, is3DMatrix(animationId)),
		};
		list.push(props);

		return list.concat(getChildren(context, elem, rect, animationId));
	}

	/**
	 * @param {HTMLElement} ctx
	 */
	const updateContext = (ctx) => {
		const id = elemGuid(ctx);
		const context = ctx.tagName === 'HTML' ? window : ctx;
		if (handlerDictionnary[id]) {
			context.removeEventListener('scroll', handlerDictionnary[id]);
		} else {
			handlerDictionnary[id] = () => { scroll(ctx); };
		}
		
		context.addEventListener('scroll', handlerDictionnary[id]);
		handlerDictionnary[id](ctx);
	};

	this.updateElements = () => {
		updateScreen();
		contexts = [];
		const nodeList = document.querySelectorAll('[data-animator-id]');
		elements = Array.from(nodeList).reduce(parseElements, []);

		contexts.forEach(updateContext);
	};

	/**
	 * @param {array} anims
	 */
	this.setAnimations = (anims) => {
		animations = anims;
		this.updateElements();
	};

	/* eslint-disable no-console */
	this.debug = () => {
		console.log('animations', animations);
		console.log('elements', elements);
		console.log('contexts', contexts);
	};
	/* eslint-enable no-console */
}
