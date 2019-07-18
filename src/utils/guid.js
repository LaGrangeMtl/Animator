//@ts-check

export function guid() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * @param {HTMLElement} element
 * @returns {string}
 */
export function elemGuid(element) {
	let id = element.getAttribute('data-guid');
	if (!id) {
		id = guid();
		element.setAttribute('data-guid', id);
	}
	return id;
}
