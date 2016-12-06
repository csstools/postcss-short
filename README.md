# Short <a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right"></a>

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-image]][lic-url]
[![Changelog][log-image]][log-url]
[![Gitter Chat][git-image]][git-url]

[Short] lets you use advanced shorthand properties in CSS.

> Short has been featured in **[Smashing Magazine]**. I hope all of these shorthands are useful and clear to first-time lookers. I hope they improve the readability of your stylesheets and save you development time along the way. Thank you so much for your support.

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

## Plugins

[Short] is powered by the following plugins:

- [Shorthand Border](https://github.com/jonathantneal/postcss-short-border)
- [Shorthand Border Radius](https://github.com/jonathantneal/postcss-short-border-radius)
- [Shorthand Color](https://github.com/jonathantneal/postcss-short-color)
- [Shorthand Font-Size](https://github.com/jonathantneal/postcss-short-font-size)
- [Shorthand Position](https://github.com/jonathantneal/postcss-short-position)
- [Shorthand Size](https://github.com/jonathantneal/postcss-short-size)
- [Shorthand Spacing](https://github.com/jonathantneal/postcss-short-spacing)
- [Font Weights](https://github.com/jonathantneal/postcss-font-weights)

Some of these plugins have more features than are described here.

## Options

Each plugin’s options may be configured by targeting the plugin’s namespace. Any plugin may be disabled using a `disable` property set as `true` or by setting the plugin’s options as false.

Example:
```js
require('postcss-short')({
    'font-size': {
        prefix: 'x'
    },
    'position': {
        disable: true
    }
})
```

```js
require('postcss-short')({
    'font-size': {
        prefix: 'x'
    },
    'position': false
})
```

## Usage

Follow these steps to use [Short].

Add [Short] to your build tool:

```bash
npm install postcss-short --save-dev
```

#### Node

```js
require('postcss-short')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Short] as a PostCSS plugin:

```js
postcss([
    require('postcss-short')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Short] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-short')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Short] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-short')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

[npm-url]: https://www.npmjs.com/package/postcss-short
[npm-img]: https://img.shields.io/npm/v/postcss-short.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-short
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-short.svg
[lic-url]: LICENSE.md
[lic-image]: https://img.shields.io/npm/l/postcss-short.svg
[log-url]: CHANGELOG.md
[log-image]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[git-image]: https://img.shields.io/badge/chat-gitter-blue.svg

[clockwise syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
[ci]: https://travis-ci.org/jonathantneal/postcss-short
[ci-img]: https://travis-ci.org/jonathantneal/postcss-short.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Short]: https://github.com/jonathantneal/postcss-short
[Smashing Magazine]: http://www.smashingmagazine.com/2015/12/introduction-to-postcss/#extendedshorthandpropertieswithpostcss-short
