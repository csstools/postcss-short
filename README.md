# PostCSS Short [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Short] lets you use advanced shorthand properties in CSS.

> PostCSS Short has been featured in **[Smashing Magazine]**. I hope all of
> these shorthands are useful and clear to first-time lookers. I hope they
> improve the readability of your stylesheets and save you development time
> along the way. Thank you so much for your support.

## Features

### Size

Declare `width` and `height` together with `size`.

```css
/* before */

.icon {
  size: 48px;
}

/* after */

.icon {
  width: 48px;
  height: 48px;
}
```

### Margin and Padding

Avoid clobbering previous `margin` or `padding` values with a skip token.

```css
/* before */

.frame {
  margin: * auto;
}

/* after */

.frame {
  margin-right: auto;
  margin-left: auto;
}
```

### Position

Declare `top`, `right`, `bottom`, and `left` values in `position`. Just like before, omit sides with a skip token.

```css
/* before */

.banner {
  position: fixed 0 0 *;
}

/* after */

.banner {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
```

### Color

Declare `color` and `background-color` together.

```css
/* before */

.canvas {
  color: #abccfc #212231;
}

/* after */

.canvas {
  color: #abccfc;
  background-color: #212231;
}
```

### Overflow

Declare individual `x` and `y` values in `overflow`. Omit sides with a skip
token.

```css
/* before */

.scrollable {
  overflow: * auto;
}

/* after */

.scrollable {
  overflow-y: auto;
}
```

### Border

Omit sides within `border-` properties and fully define individual values on the `border` property.

```css
/* before */

.container {
  border: 1px 2px / * / #343434;
}

.container--variation {
  border-width: * * 3px;
}

/* after */

.container {
  border-width: 1px 2px;
  border-color: #343434;
}

.container--variation {
  border-bottom-width: 3px;
}
```

### Border Radius

Declare `border-radius` properties using the [clockwise syntax].

```css
/* before */

.container {
  border-bottom-radius: 10px;
}

/* after */

.container {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
```

### Font Size

Declare `font-size` and `line-height` together.

```css
/* before */

.heading {
  font-size: 1.25em / 2;
}

/* after */

.heading {
  font-size: 1.25em;
  line-height: 2;
}
```

### Font Weight

Declare `font-weight` with common names.

```css
/* before */

p {
  font-weight: light;
}

/* after */

p {
  font-weight: 300;
}
```

## Usage

Add [PostCSS Short] to your project:

```bash
npm install postcss-short --save-dev
```

Use [PostCSS Short] to process your CSS:

```js
const postcssShort = require('postcss-short');

postcssShort.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssShort = require('postcss-short');

postcss([
  postcssShort(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

[PostCSS Short] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Plugins

[PostCSS Short] is powered by the following plugins:

- [PostCSS Short Border](https://github.com/jonathantneal/postcss-short-border)
- [PostCSS Short Border Radius](https://github.com/jonathantneal/postcss-short-border-radius)
- [PostCSS Short Color](https://github.com/jonathantneal/postcss-short-color)
- [PostCSS Short Font-Size](https://github.com/jonathantneal/postcss-short-font-size)
- [PostCSS Short Overflow](https://github.com/jonathantneal/postcss-short-overflow)
- [PostCSS Short Position](https://github.com/jonathantneal/postcss-short-position)
- [PostCSS Short Size](https://github.com/jonathantneal/postcss-short-size)
- [PostCSS Short Spacing](https://github.com/jonathantneal/postcss-short-spacing)
- [PostCSS Font Weights](https://github.com/jonathantneal/postcss-font-weights)

Some of these plugins have more features than are described here.

## Options

### features

Each plugin’s options may be configured by targeting the plugin’s namespace.
Any plugin may be disabled by setting the plugin’s options as false.

```js
postcssShort({
  features: {
    'font-size': {
      prefix: 'x'
    },
    'position': false
  }
});
```

#### prefix

The `prefix` option defines a prefix required by properties being transformed.
Wrapping dashes are automatically applied, so that `x` would transform
`-x-border`.

```js
postcssShort({ prefix: 'x' });
```

```pcss
.example-1 {
  -x-border-color: blue blue *;
  -x-color: * #fafafa;
}

/* becomes */

.example-1 {
  border-top-color: blue;
  border-right-color: blue;
  border-left-color: blue;
  background-color: #fafafa;
}
```

#### skip

The `skip` option defines the skip token used to ignore portions of the
shorthand.

```js
postcssShort({ skip: '-' });
```

```pcss
.example-1 {
  border-color: blue blue -;
  color: - #fafafa;
}

/* becomes */

.example-1 {
  border-top-color: blue;
  border-right-color: blue;
  border-left-color: blue;
  background-color: #fafafa;
}
```

[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-short.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-short
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-short.svg
[npm-url]: https://www.npmjs.com/package/postcss-short

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Short]: https://github.com/jonathantneal/postcss-short
[clockwise syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
[Smashing Magazine]: https://www.smashingmagazine.com/2015/12/introduction-to-postcss/#extendedshorthandpropertieswithpostcss-short
