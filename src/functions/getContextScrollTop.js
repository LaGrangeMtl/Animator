/**
 * @param {Element} context 
 * @param {Scrollbar} scrollbar 
 */
export default function getContextScrollTop(context) {
	let ctx = context;
	if (context.tagName === 'HTML') ctx = document.scrollingElement || context;
	return ctx.scrollTop;
}
