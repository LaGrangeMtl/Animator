//@ts-check

import 'core-js/fn/array/find';

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

export function Animator() {
	let animations = [];
	let elements = [];
	let contexts = [];

	const handlerDictionnary = {};
	const loopDictionnary = {};
	const lastValuesDictionnary = {};
	const animatorTopDictionnary = {};

	const win = {
		width: 0,
		height: 0,
	};

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
		if (parts.length !== 2) throw new Error('Missing parameters in animation "when" (expects: ELEM_SCREEN)');

		const st = getContextScrollTop(context);
		const id = elemGuid(context);

		let obj;
		switch (parts[0]) {
			default:
			case ELEM_TOP: obj = rect.top - st; break;
			case ELEM_CENTER: obj = rect.top + (rect.height / 2) - st; break;
			case ELEM_BOTTOM: obj = rect.top + rect.height - st; break;
		}
		
		let screen;
		switch (parts[1]) {
			default:
			case SCREEN_TOP: screen = animatorTopDictionnary[id] + st; break;
			case SCREEN_CENTER: screen = animatorTopDictionnary[id] + (win.height / 2) + st; break;
			case SCREEN_BOTTOM: screen = animatorTopDictionnary[id] + win.height + st; break;
		}

		return obj - screen;
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

		if (!animation) return [];
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
					context,
					ease: anim.ease,
					keyframes,
					keys: Object.keys(keyframes),
					initialMatrix: getInitialMatrix(el),
				});
			});
			return c;
		}, []);
	}

	/**
	 * @param {HTMLElement} context 
	 * @param {HTMLElement} elem 
	 * @returns {AnimatorRect}
	 */
	function getRect(context, elem) {
		const rect = elem.getBoundingClientRect();
		const st = getContextScrollTop(context);
		const id = elemGuid(context);

		return {
			top: (rect.top - animatorTopDictionnary[id]) + st,
			height: rect.height,
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
			animatorTopDictionnary[id] = el.getBoundingClientRect().top;
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
			return el.keyframes[propKey].reduce((propCarry, propVal) => {
				const [offset, value] = propVal;
				if (propCarry.startOffset === undefined || st >= offset) {
					propCarry.startOffset = offset;
					propCarry.startValue = value;

					if (propCarry.endOffset <= propCarry.startOffset) {
						propCarry.endOffset = offset;
						propCarry.endValue = value;
					}
				}
				if (propCarry.endOffset === undefined || st <= offset) {
					propCarry.endOffset = offset;
					propCarry.endValue = value;
				}
				
				return {
					st,
					ease: el.ease,
					key: propKey,
					...propCarry,
				};
			}, {});
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
			values.rotation
			|| values.scaleX
			|| values.scaleY
			|| values.x
			|| values.y
			|| values.z
		) {
			values.transform = toCSS(composeMultiple([
				initialMatrix,
				translate(values.x || 0, values.y || 0, values.z || 0),
				rotate(values.rotation || 0),
				scale(values.scaleX || 1, values.scaleY || 1, values.scaleZ || 1),
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
	 * @param {HTMLElement} ctx 
	 * @param {number} st 
	 */
	function update(ctx, st) {
		elements.forEach((el) => {
			if (el.context !== ctx) return;

			const values = matrix(el.initialMatrix, transformValues(el, st));
			const id = elemGuid(el.node);
			if (hasChanged(id, values)) {
				Object.assign(el.node.style, values);
				lastValuesDictionnary[id] = values;
			}
		});
	}

	/**
	 * @param {HTMLElement} elem 
	 */
	function getInitialMatrix(elem) {
		elem.style.transform = '';
		const transform = window.getComputedStyle(elem).getPropertyValue('transform');
		return transform !== 'none' ? fromString(transform) : identity();
	}

	/**
	 * @param {string} animationId 
	 */
	function getEase(animationId) {
		return (animations[animationId] && animations[animationId].ease) || null;
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
			ease: getEase(animationId),
			keyframes,
			keys: Object.keys(keyframes),
			initialMatrix: getInitialMatrix(elem),
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
		contexts = [];
		win.width = window.innerWidth;
		win.height = window.innerHeight;
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

	this.debug = () => {
		console.log('animations', animations);
		console.log('elements', elements);
		console.log('contexts', contexts);
	};
}
