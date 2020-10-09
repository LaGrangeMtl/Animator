# Animator

The Animator is a dependency free animation library that allows you to apply css changes to a tag (and/or its children tags) in sync with the scroll.

The basic principle of this library is to apply the modifications to the DOM in a very efficient way, avoiding "paint" and applying the [FLIP technique](https://aerotwist.com/blog/flip-your-animations/).


# Installing Animator

In your project, simply run :

```sh
npm install --save @lagrange/animator
```


# Getting Started

## Setting up the JS side of things:


First things first, import the library, and instanciate the Animator:

```js
import Animator from '@lagrange/animator';

const animator = new Animator();
```

We then need to assign a set of animations parameters to the Animator. These animation parameters are usually defined in a separate file named 'animations.js' with the following structure:

```js
import Animator from '@lagrange/animator';

const {
	ELEM_BOTTOM,
	ELEM_CENTER,
	ELEM_TOP,
	SCREEN_BOTTOM,
	SCREEN_CENTER,
	SCREEN_TOP,
} = Animator.getConstants();

export const Animations = {
	get() {
		const animations = {};

		// ...

		return animations;
	}
}
```

Constants are used to specify how the animation will be handled. Here is a sample animation:

```js
animations.simple_animation = {
	props: [
		{
			when: `${ELEM_TOP}_${SCREEN_BOTTOM}`,
			x: '100vw',
		},
		{
			when: `${ELEM_BOTTOM}_${SCREEN_TOP}`,
			x: '100vw',
		}
	]
}
```

Here `simple_animation` is the ID of the animation, we'll use this later in the DOM to mark tags for animation.

We then define the props we want to animate. This is a list of keyframes containing 2 informations:

1. **when**: the keyframe position (this determines at what point the animation should take the stated props values).
2. **CSS props**: you can then define the value of the css properties to apply to the this keyframe, here are the current valid props:
   - x (translateX)
   - y (translateY)
   - scaleX
   - scaleY
   - rotation
   - opacity
   
For the `x` and `y` props, you can use the following units:
   - `px`
   - `vh` and `vw`
   - `%`

You can also apply props to children elements, please note that the `ELEM_*` constants still refer to the parent's position.

```js
animations.simple_animation = {
	props: [
		{
			when: `${ELEM_TOP}_${SCREEN_BOTTOM}`,
			x: '0vw',
		},
		{
			when: `${ELEM_BOTTOM}_${SCREEN_TOP}`,
			x: '100vw',
		}
	],
	children: [
		{
			selector: '.some-div',
			props: [
				{
					when: `${ELEM_TOP}_${SCREEN_BOTTOM}`,
					x: '0vw',
				},
				{
					when: `${ELEM_BOTTOM}_${SCREEN_TOP}`,
					x: '100vw',
				}
			]
		},
		// ...
	]
}
```

Finally, you can adjust the timing of the animations by changing the ease, either in the root object or the children object:

```js
animations.simple_animation = {
	ease: 'easeOutCubic',
	props: [
		//...
	]
}
```

and / or

```js
animations.simple_animation = {
	children: [
		{
			selector: '.some-div',
			ease: 'easeInOutSine',
			props: [
				//...
			]
		}
	]
}
```

If performance seems to be an issue, you can create a layer composition by forcing 3d transforms on your animation:

```js
animations.simple_animation = {
	force3d: true,
	props: [
		//...
	]
}
```

Finally, this patterns allows us to define responsive animations via the function `get` parameter `width`: 

```js
animations.simple_animation = {
	props: [
		{
			when: `${ELEM_TOP}_${SCREEN_BOTTOM}`,
			x: width < 768 ? '100vw' : '0vw',
		},
		{
			when: `${ELEM_BOTTOM}_${SCREEN_TOP}`,
			x: width < 768 ? '50vw' : '100vw',
		}
	],
}
```

Once you're done with setting up animations, you can simply pass them to the animator instance:

```js
import { Animations } from './animations';
animator.setAnimations(Animations.get(window.innerWidth));
```

Please note that `setAnimations` calculates every keyframe and thus can be a very intensive CPU job, please only use when resizing elements or the window or on load.

Since every keyframe is calculated once and then cached, we need to call this function on every resize:

```js
function onResize() {
	animator.setAnimations(Animations.get(window.innerWidth));
}
```

Alternatively, you could also update all the Animator instances using:

```js
Animator.updateAll();
```

Or access the instances list, which is an array of all Animators:

```js
/** @type {Animator[]} */
Animator.instances
```

## A note on scrolljacking

By default, the Animator listens to a 'scroll' event to triggers it's animations, you can however bypass this and the `animator.virtualScroll` function on demand:

```js
animator.virtualScroll(context, scrollTop);
```

Where `context` is the scrolling element and `scrollTop` the virtual scroll position.


## Seting up the DOM.

Here is the basic structure needed for the animator to work:

```html
<html data-scrollbar>
	<body>
		<div data-animator-id="simple_animation">
			<div class="some-div"></div>
		</div>
	</body>
</html>
```

And that's it, you're all set! :)