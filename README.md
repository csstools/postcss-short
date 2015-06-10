# PostCSS Short

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Short] is a [PostCSS] plugin that helps you write shorter and more readable CSS by allowing you to combine related properties together while helping you avoid overrides.

---

Use the asterisk (`*`) to avoid overrides in shorthand CSS properties like `margin` and `padding`.

```css
/* short css: */

.container {
	margin: * auto;
}

/* renders as: */

.container {
	margin-left: auto;
	margin-right: auto;
}
```

Extend the `position` property to allow shorthand values for `top`, `right`, `bottom`, and `left`.

```css
/* short css: */

.overlay {
	position: absolute 0;
}

/* renders as: */

.overlay {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
```

The shorthand `position` property uses [1-to-4-value syntax] like `margin` and `padding`, and also allows the asterisk (`*`) to avoid overrides.

---

Use the `size` property as a shorthand for `width` and `height`.

```css
/* short css: */

.avatar {
	size: 32px;
}

.avatar.portrait {
	size: 32px 48px;
}

/* renders as: */

.avatar {
	width: 32px;
	height: 32px;
}

.avatar.portrait {
	width: 32px;
	height: 48px;
}
```

The shorthand `size` property measures `width` then `height`, and also allows the asterisk (`*`) to avoid overrides.

---

Now, put it all together and write short, clear code.

```css
/* short css: */

.banner {
	position: fixed 0 0 *;
	size: 100% 48px;
}

/* renders as: */

.banner {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	width: 100%;
	height: 48px;
}
```

---

Use the shorthand `:over` pseudo-class to target `:focus` and `:hover`.

```css
/* short css: */

.button:over {
	background-color: blue;
}

/* renders as: */

.button:focus,
.button:hover {
	background-color: blue;
}
```

---

Next, use `font-weight` values beyond `normal` and `bold`.

```css
/* short css: */

h3 {
	font-weight: medium;
}

p {
	font-weight: light;
}

/* renders as: */

h3 {
	font-weight: 500;
}

p {
	font-weight: 300;
}
```

Combine related `text` properties together.

```css
/* short css: */

.heading {
	text: thin center uppercase 1.25rem sans-serif;
}

/* renders as: */

.heading {
	font-weight: 100;
	text-align: center;
	text-transform: uppercase;
	font-size: 1.25rem;
	font-family: sans-serif;
}
```

The `text` property shorthands all text-related properties. This includes `color`, `font-style`, `font-variant`, `font-weight`, `font-stretch`, `text-decoration`, `text-align`, `text-rendering`, `text-transform`, `white-space`, `font-size`, `line-height`, `letter-spacing`, `word-spacing`, and `font-family`.

Take advantage of this property.

```css
/* short css: */

.heading {
	text: .75rem 1.5 .1em;
}

/* renders as: */

.heading {
	font-size: 1.25rem;
	line-height: 1.5;
	letter-spacing: .1em;
}
```

---

## Installation

You just need to follow these two steps to use shorts:

1. Add [PostCSS] to your build tool.
2. Add **Short** to your PostCSS process.

### Node

```js
postcss([ require('postcss-short') ]);
```

or:
```js
postcss([ require('postcss-short')({
	prefix: 'postcss' // defines a prefix (-postcss-) to prevent clashes
}) ]);
```

### Grunt

```js
var short = require('postcss-short');

grunt.initConfig({
	postcss: {
		options: {
			processors: [short]
		},
		dist: {
			src: 'build/*.css'
		}
	}
});
```

or:
```js
var short = require('postcss-short');

grunt.initConfig({
	postcss: {
		options: {
			processors: [short({
				prefix: 'postcss' // defines a prefix (-postcss-) to prevent clashes
			})]
		},
		dist: {
			src: 'build/*.css'
		}
	}
});
```

See [PostCSS] docs for examples for your environment.

[Short]: https://github.com/jonathantneal/postcss-short
[PostCSS]: https://github.com/postcss/postcss
[1-to-4-value syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
