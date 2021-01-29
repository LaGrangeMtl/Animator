import Animator from './Animator/index';

const {
	ELEM_BOTTOM,
	ELEM_CENTER,
	ELEM_TOP,
	ELEM_LEFT,
	ELEM_H_CENTER,
	ELEM_RIGHT,

	SCREEN_BOTTOM,
	SCREEN_CENTER,
	SCREEN_TOP,
	SCREEN_LEFT,
	SCREEN_H_CENTER,
	SCREEN_RIGHT,
} = Animator.getConstants();

export const Animations = {
	get(width):AnimatorAnimations {
		const lightTranslateScaleParallax = (selector = '.parallax'):AnimatorAnimChildren => ({
			selector,
			props: [
				{
					when: [ELEM_LEFT, SCREEN_RIGHT],
					scaleX: 0,
					scaleY: 0,
					rotation: 0,
				},
				{
					when: [ELEM_RIGHT, SCREEN_LEFT],
					scaleX: 4,
					scaleY: 4,
					rotation: Math.PI * 2,
				},
			],
		});

		return {
			img_parallax: {
				force3d: true,
				children: [
					lightTranslateScaleParallax(),
				],
			},
		};
	},
};
