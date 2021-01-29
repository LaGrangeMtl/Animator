
import './utils/polyfills';

import Animator from './Animator';
import { Animations } from './Animations';
import Barba from './Barba';
import context from './lagrange/context';
import { docReady } from './utils/docReady';
import { SmoothScroller, SCROLLER_MODES } from './scroller/SmoothScroller';
import { SCROLL_PRIMARY } from './Constants';

docReady.then(() => {
	const main = document.querySelector('[data-main]');
	const scroll = new SmoothScroller(main, SCROLL_PRIMARY, SCROLLER_MODES.HORIZONTAL);

	[
		//List global modules here
	].forEach(c => c.init(context()));

	const animator = new Animator();
	const updateAnimator = () => {
		animator.setAnimations(Animations.get(window.innerWidth));
	};
	
	window.addEventListener('resize', updateAnimator);
	updateAnimator();
	
	Barba.init([
		// List container modules here
	], () => {
		scroll.updateScrollDimension();
		scroll.update();
	});
}).catch(e => {
	console.error(e);
});
