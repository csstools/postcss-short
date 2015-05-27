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

## font weight

Use the full range of font weight proper names.

Short CSS:
```css
.usage-1 {
	font: light italic "Helvetica Neue";
}

.usage-2 {
	font-weight: medium;
}
```
Rendered CSS:
```css
.usage-1 {
	font: 300 italic "Helvetica Neue";
}

.usage-2 {
	font-weight: 500;
}
```

## text

Keep text related properties together.

Short CSS:
```css
.usage-1 {
	text: red uppercase underline Arial;
}

.usage-2 {
	text: thin center grey lowercase optimizeLegibility 1rem 1.25 .25em .1em "Helvetica Neue";
}
```
Rendered CSS:
```css
.usage-1 {
	color: #ff0000;
	text-transform: uppercase;
	text-decoration: underline;
	font-family: Arial;
}

.usage-2 {
	font-weight: 100;
	text-align: center;
	color: #808080;
	text-transform: lowercase;
	text-rendering: optimizeLegibility;
	font-size: 1rem;
	line-height: 1.25;
	letter-spacing: .25em;
	word-spacing: .1em;
	font-family: "Helvetica Neue";
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
