# Short [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Short] is a [PostCSS] plugin that creates and extends shorthand properties in CSS.

I hope each of these shorthand properties are clear and concise to any first-time viewer, improving the readability of stylesheets and saving developers time along the way.

## Features

### Size

Set `width` and `height` together using the `size` property.

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

Avoid clobbering the previous `margin` using an asterisk, which indicates that an edge is skipped.

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

Set `top`, `right`, `bottom`, and `left` in the `position` property with the [clockwise syntax]. Just like before, an asterisk indicates that an edge is skipped.

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

Set `color` and `background-color` together.

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

Set multiple edges on `border` properties with the same [clockwise syntax].

```css
/* before */

.container {
    border: 1px 2px #343434;
}

/* after */

.container {
    border-width: 1px 2px;
    border-color: #343434;
}
```

### Font-Size

Set `font-size` and `line-height` together.

```css
/* before */

.heading {
    font-size: 1.25em 2;
}

/* after */

.heading {
    font-size: 1.25em;
    line-height: 2;
}
```

### Text

Or, keep all text properties together with the `text` property.

```css
/* before */

.section {
    text: dimgrey bold center uppercase 1.25em 1.5 .05em;
}

/* after */

.section {
    color: dimgrey;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.25em;
    line-height: 1.5;
    letter-spacing: .05em;
}
```

## Plugins

[Short] is powered by the following plugins:

- [Shorthand Border](https://github.com/jonathantneal/postcss-short-border)
- [Shorthand Color](https://github.com/jonathantneal/postcss-short-color)
- [Shorthand Font-Size](https://github.com/jonathantneal/postcss-short-font-size)
- [Shorthand Position](https://github.com/jonathantneal/postcss-short-position)
- [Shorthand Size](https://github.com/jonathantneal/postcss-short-size)
- [Shorthand Spacing](https://github.com/jonathantneal/postcss-short-spacing)
- [Shorthand Text](https://github.com/jonathantneal/postcss-short-text)

Some of these plugins have more features than are described here.

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

## Options

Each plugin’s options may be configured by targeting the plugin’s namespace. Any plugins may be disabled by giving them a `disable` property.

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

[clockwise syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
[ci]: https://travis-ci.org/jonathantneal/postcss-short
[ci-img]: https://travis-ci.org/jonathantneal/postcss-short.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Short]: https://github.com/jonathantneal/postcss-short
