import { SCREEN_TOP, SCREEN_CENTER, SCREEN_BOTTOM } from '../Constants';

export const screen = {};

export function updateScreen() {
	screen[SCREEN_TOP] = 0;
	screen[SCREEN_CENTER] = (window.innerHeight / 2);
	screen[SCREEN_BOTTOM] = window.innerHeight;
}

updateScreen();
