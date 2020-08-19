/**
 * @param {Element} context 
 * @param {Scrollbar} scrollbar 
 */
export default function getContextScrollTop(context) {
	let ctx = context;
	if (context.tagName === 'HTML') ctx = document.scrollingElement || context;
	
	const stProp = context.getAttribute('data-scroll-top') || context.style.getPropertyValue('--scroll-top');

	return (stProp || stProp !== '') ? parseFloat(-stProp) : ctx.scrollTop;
}
