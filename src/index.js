//@ts-check

// import 'core-js/fn/array/find';

import { elemGuid } from './utils/guid';
import * as Constants from './Constants';
import { updateScreen } from './utils/screen';
import parseWhen from './functions/parseWhen';
import parseVal from './functions/parseVal';
import getContextScrollTop from './functions/getContextScrollTop';
import { transform2d } from './functions/transform2d';
import transformValues from './functions/transformValues';
import matrix from './functions/matrix';
import { i3d } from './utils/CssMatrix';
import { getInitialMatrix } from './functions/getInitialMatrix';
import calculate2dTransforms from './functions/calculate2dTransforms';

const ATTR_NAME = 'data-animator-id';

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

export default class Animator {
	static instances = [];

	static updateAll() {
		Animator.instances.forEach((instance) => {
			instance.updateElements();
		});
	}

	animations = [];

	elements = [];

	contexts = [];

	handlerDictionnary = {};

	loopDictionnary = {};

	lastValuesDictionnary = {};
	
	animatorTopDictionnary = {};

	constructor() {
		Animator.instances.push(this);
	}

	static getConstants() {
		return {
			...Constants,
		};
	}

	/**
	 * @param {HTMLElement} elem 
	 * @param {AnimatorRect} rect 
	 * @param {string} animationId 
	 * @param {object} props 
	 * @param {HTMLElement} child
	 */
	getKeyframes = (elem, rect, animationId, props = null, child = null) => {
		let animation = this.animations[animationId];

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
			const from = parseWhen(rect, anim.when);

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
	getRect = (context, elem) => {
		const style = elem.getAttribute('style');
		elem.setAttribute('style', '');
		const { top, height } = elem.getBoundingClientRect();
		const st = getContextScrollTop(context);
		const id = elemGuid(context);
		elem.setAttribute('style', style);

		return {
			top: (top - this.animatorTopDictionnary[id]) + st,
			height,
		};
	}

	/**
	 * @param {HTMLElement} elem 
	 */
	getContext = (elem) => {
		let context = null;
		let el = elem;

		while (el.parentElement && !context) {
			el = el.parentElement;
			if (el.getAttribute('data-scrollbar') || el.getAttribute('data-scrollbar') === '') {
				context = el;
			}
		}
		if (!this.contexts.find(ctx => context === ctx)) {
			const id = elemGuid(context);
			this.animatorTopDictionnary[id] = el.getBoundingClientRect().top + el.scrollTop;
			this.contexts.push(context);
		}
		return context;
	}


	/**
	 * @param {string} id
	 * @param {object} values 
	 */
	hasChanged = (id, values) => {
		if (!this.lastValuesDictionnary[id]) return true;
		return this.lastValuesDictionnary[id] !== JSON.stringify(values);
	};

	/**
	 * @param {HTMLElement} ctx 
	 */
	scroll = (ctx) => {
		const id = elemGuid(ctx);
		const st = getContextScrollTop(ctx);
		if (this.loopDictionnary[id]) {
			cancelAnimationFrame(this.loopDictionnary[id]);
		}
		
		this.loopDictionnary[id] = requestAnimationFrame(() => {
			this.update(ctx, st);
		});
	};

	/**
	 * @param {Number} st 
	 */
	virtualScroll = (ctx, st) => {
		this.update(ctx, st);
	};

	/**
	 * @param {HTMLElement} ctx 
	 * @param {number} st 
	 */
	update = (ctx, st) => {
		this.elements.forEach((el) => {
			if (el.context !== ctx || Object.keys(el.keyframes).length === 0) return;

			const isSVG = ~el.node.namespaceURI.indexOf('svg');
			let values = null;

			if (isSVG && el.node.tagName.toLowerCase() !== 'svg') {
				values = transform2d(transformValues(el, st));
			} else if (el.is3DMatrix || (el.initialMatrix && el.initialMatrix.length === 16)) {
				if (!el.initialMatrix) el.initialMatrix = [...i3d];
				values = matrix(el.initialMatrix, transformValues(el, st));
			} else {
				values = calculate2dTransforms(el, st);
			}

			const id = elemGuid(el.node);
			if (this.hasChanged(id, values)) {
				if (values) {
					Object.assign(el.node.style, values);
				}
				this.lastValuesDictionnary[id] = JSON.stringify(values);
			}
		});
	}

	/**
	 * @param {string} animationId 
	 */
	getEase = (animationId) => {
		return (this.animations[animationId] && this.animations[animationId].ease) || null;
	}

	/**
	 * @param {string} animationId 
	 */
	is3DMatrix = (animationId) => {
		return (this.animations[animationId] && this.animations[animationId].force3d) || false;
	}

	/**
	 * @param {HTMLElement} context 
	 * @param {HTMLElement} elem 
	 * @param {AnimatorRect} rect 
	 * @param {string} animationId 
	 */
	getChildren = (context, elem, rect, animationId) => {
		if (Array.isArray(this.animations[animationId])) {
			return [];
		}
		
		const children = (this.animations[animationId] && this.animations[animationId].children) || [];

		return children.reduce((c, anim) => {
			const arr = Array.from(elem.querySelectorAll(anim.selector));
			
			arr.forEach((el) => {
				const keyframes = this.getKeyframes(elem, rect, null, anim.props, el);
				
				c.push({
					node: el,
					parent: elem,
					context,
					ease: anim.ease,
					is3DMatrix: this.is3DMatrix(animationId),
					keyframes,
					keys: Object.keys(keyframes),
					initialMatrix: getInitialMatrix(el, this.is3DMatrix(animationId)),
				});
			});
			return c;
		}, []);
	}

	/**
	 * @param {array} list 
	 * @param {HTMLElement} elem 
	 */
	parseElements = (list, elem) => {
		const context = this.getContext(elem);
		const animationId = elem.getAttribute(ATTR_NAME);

		const rect = this.getRect(context, elem);

		elemGuid(elem);

		const keyframes = this.getKeyframes(elem, rect, animationId);

		const props = {
			node: elem,
			context,
			is3DMatrix: this.is3DMatrix(animationId),
			ease: this.getEase(animationId),
			keyframes,
			keys: Object.keys(keyframes),
			initialMatrix: getInitialMatrix(elem, this.is3DMatrix(animationId)),
		};
		list.push(props);

		return list.concat(this.getChildren(context, elem, rect, animationId));
	}

	/**
	 * @param {HTMLElement} ctx
	 */
	updateContext = (ctx) => {
		const id = elemGuid(ctx);
		const context = ctx.tagName === 'HTML' ? window : ctx;
		if (this.handlerDictionnary[id]) {
			context.removeEventListener('scroll', this.handlerDictionnary[id]);
		} else {
			this.handlerDictionnary[id] = () => { this.scroll(ctx); };
		}
		
		context.addEventListener('scroll', this.handlerDictionnary[id]);

		this.handlerDictionnary[id](ctx);
	};

	updateElements = () => {
		updateScreen();
		this.contexts = [];
		const nodeList = document.querySelectorAll(`[${ATTR_NAME}]`);
		this.elements = Array.from(nodeList).reduce(this.parseElements, []);

		this.contexts.forEach(this.updateContext);
	};

	/**
	 * @param {array} anims
	 */
	setAnimations = (anims) => {
		this.animations = anims;
		this.updateElements();
	};

	/* eslint-disable no-console */
	debug = () => {
		console.log('animations', this.animations);
		console.log('all elements', this.elements);
		console.log('filtered elements', this.elements.filter(x => x.keys.length > 0));
		console.log('contexts', this.contexts);
	};
}

// @ts-ignore
window.__Animator = Animator; // eslint-disable-line
