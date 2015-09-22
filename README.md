# Short [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Short] is a [PostCSS] plugin that lets you use advanced shorthand properties in CSS.

Shorthand properties allow you write more concise and often more readable style sheets, saving time and energy.

```css
/* before */

.banner {
    position: fixed 0 0 *;
    size: 100% 48px;
}

.section {
    margin: 40px;
    text: bold center uppercase dimgrey 1.25em 1.5 .05em;
}

.section.inset {
    margin: * auto;
}

/* after */

.banner {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 48px;
}

.section {
    margin: 40px;
    color: dimgrey;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.25em;
    line-height: 1.5;
    letter-spacing: .05em;
}

.section.inset {
    margin-right: auto;
    margin-left: auto;
}
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

## Plugins

[Short] is powered by the following plugins (in order):

- [Shorthand Font-Size](https://github.com/jonathantneal/postcss-short-font-size)
- [Shorthand Position](https://github.com/jonathantneal/postcss-short-position)
- [Shorthand Size](https://github.com/jonathantneal/postcss-short-size)
- [Shorthand Spacing](https://github.com/jonathantneal/postcss-short-spacing)
- [Shorthand Text](https://github.com/jonathantneal/postcss-short-text)

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

[ci]: https://travis-ci.org/jonathantneal/postcss-short
[ci-img]: https://travis-ci.org/jonathantneal/postcss-short.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Short]: https://github.com/jonathantneal/postcss-short
