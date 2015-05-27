# PostCSS Short

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Short] is a [PostCSS] plugin that allows you to write short, sweet CSS.

## size

Combine width and height properties into one easy `size` property.

Short CSS:
```css
.usage-1 {
	size: 10px;
}

.usage-2 {
	size: 20px 10px;
}
```

Rendered CSS:
```css
.usage-1 {
	width: 10px;
	height: 10px;
}

.usage-2 {
	width: 20px;
	height: 10px;
}
```

The `size` property allows shorthand for (in order) `width` and `height`.

## margin and padding

Use `margin` and `padding` without writing over previous declarations. The asterisk (**\***) value tells the processor ignore that particular declaration.

Short CSS:
```css
.usage-1 {
	margin: 10px *;
	padding: * 15px;
}

.usage-2 {
	margin: 10px 20px *;
	padding: 10px * 10px 20px;
}
```

Rendered CSS:
```css
.usage-1 {
	margin-top: 10px;
	margin-bottom: 10px;
	padding-right: 20px;
	padding-left: 20px;
}

.usage-2 {
	margin-top: 10px;
	margin-right: 20px;
	margin-left: 20px;
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 20px;
}
```

## position

Improve readability by keeping position values together. As before, the asterisk (**\***) value can be used to tell CSS to ignore that particular declaration.

Short CSS:
```css
.usage-1 {
	position: absolute 0;
}

.usage-2 {
	position: fixed 0 0 *;
}

.usage-3 {
	position: 10px * 5px;
}
```
Rendered CSS:
```css
.usage-1 {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}

.usage-2 {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
}

.usage-3 {
	top: 10px;
	bottom: 5px;
}
```

The `position` property allows shorthand for `position`, `top`, `right`, `bottom`, and `left`.

## font weight

Use the full range of font weight proper names.

Short CSS:
```css
.usage {
	font-weight: medium;
}
```
Rendered CSS:
```css
.usage {
	font-weight: 500;
}
```

## text

Keep text related properties together.

Short CSS:
```css
.usage {
	text: thin center uppercase 1rem 1.25 .5em sans-serif;
}
```
Rendered CSS:
```css
.usage {
	font-weight: 100;
	text-align: center;
	text-transform: uppercase;
	font-size: 1rem;
	line-height: 1.25;
	letter-spacing: .25em;
	font-family: sans-serif;
}
```

The `text` property allows shorthand for (in order) `color`, `font-style`, `font-variant`, `font-weight`, `font-stretch`, `text-decoration`, `text-align`, `text-rendering`, `text-transform`, `white-space`], `font-size`, `line-height`, `letter-spacing`, `word-spacing`, and `font-family`.

### :over

Target `:focus` and `:hover` with one pseudo state.

Short CSS:
```css
.usage:over {
	background-color: #00f;
}
```
Rendered CSS:
```css
.usage:focus, .usage:hover {
	background-color: #00f;
}
```

## Usage

### Node

```js
postcss([ require('postcss-short') ]);
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

See [PostCSS] docs for examples for your environment.

[Short]: https://github.com/jonathantneal/postcss-short
[PostCSS]: https://github.com/postcss/postcss
