var postcss = require('postcss');
var colors = require('css-color-names');
var fontWeights = require('css-font-weight-names');

module.exports = postcss.plugin('postcss-asterisk', function (opts) {
	opts = opts || {};

	var units = {
		asterisk: /^\*$/,
		anything: /^.+$/,
		color: new RegExp('^(' + Object.keys(colors).concat('#[0-9a-f]+|currentColor|(hsl|rgb)a?\(.+\)|transparent|\\*').join('|') + ')$', 'i'),
		fontStyle:   /^(inherit|italic|normal|oblique|\*)$/i,
		fontStretch: /^(condensed|expanded|extra-condensed|extra-expanded|inherit|normal|semi-condensed|semi-expanded|ultra-condensed|ultra-expanded|\*)$/i,
		fontWeight: new RegExp('^(' + Object.keys(fontWeights).concat('[1-9]00|bolder|inherit|lighter|\\*').join('|') + ')$', 'i'),
		fontVariant: /^(all-petite-caps|all-small-caps|none|normal|oldstyle-nums|ordinal|petite-caps|slashed-zero|small-caps|stacked-fractions|titling-caps|unicase|\*)$/i,
		length: /^(\*|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw)|calc\(.+\)|inherit)$/i,
		lengthFloat: /^(\*|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw)?|calc\(.+\)|inherit)$/i,
		position: /^(\*|absolute|inherit|fixed|relative|static|sticky)$/i,
		textAlign: /^(center|end|inherit|justify|left|match-parent|right|start|start-end|\*)$/i,
		textDecoration: /^(blink|inherit|initial|line-through|none|overline|underline|\*)$/i,
		textRendering: /^(auto|geometricPrecision|inherit|optimizeLegibility|optimizeSpeed|\*)$/i,
		textTransform: /^(capitalize|full-width|inherit|lowercase|none|uppercase|\*)$/i,
		whiteSpace: /^(inherit|normal|nowrap|pre|pre-line|pre-wrap|\*)$/i
	};

	var transforms = {
		'margin': {
			properties: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
			syntaxes:   [units.length, units.length, units.length, units.length],
			fallbacks:  [0, 0, 0, 1],
			requires:   units.asterisk
		},
		'max-size': {
			properties: ['max-width', 'max-height'],
			syntaxes:   [units.length, units.length],
			fallbacks:  [0, 0]
		},
		'min-size': {
			properties: ['min-width', 'min-height'],
			syntaxes:   [units.length, units.length],
			fallbacks:  [0, 0]
		},
		'padding': {
			properties: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
			syntaxes:   [units.length, units.length, units.length, units.length],
			fallbacks:  [0, 0, 0, 1],
			requires:   units.asterisk
		},
		'position': {
			properties: ['position', 'top', 'right', 'bottom', 'left'],
			syntaxes:   [units.position, units.length, units.length, units.length, units.length],
			fallbacks:  [0, 1, 1, 1, 2],
			ordered:    true,
			requires:   units.length
		},
		'size': {
			properties: ['width', 'height'],
			syntaxes:   [units.length, units.length],
			fallbacks:  [0, 0]
		},
		'text': {
			properties: 'color font-style font-variant font-weight font-stretch text-decoration text-align text-rendering text-transform white-space font-size line-height letter-spacing word-spacing font-family'.split(' '),
			syntaxes:   [units.color, units.fontStyle, units.fontVariant, units.fontWeight, units.fontStretch, units.textDecoration, units.textAlign, units.textRendering, units.textTransform, units.whiteSpace, units.length, units.lengthFloat, units.length, units.length, units.anything],
			fallbacks:  []
		}
	};

	Object.keys(transforms).forEach(function (key) {
		if ((!opts.allowed || opts.allowed.indexOf(key) !== -1) && (!opts.denied || opts.denied.indexOf(key) === -1)) {
			var prefix = opts.prefix ? typeof opts.prefix === 'string' && opts.prefix || String(opts.prefix[key]) : false;

			if (prefix) {
				transforms['-' + prefix.replace(/^-|-$/g, '') + '-' + key] = transforms[key];

				delete transforms[key];
			}
		} else {
				delete transforms[key];
		}
	});

	return function (css) {
		css.eachDecl(new RegExp('^(' + Object.keys(transforms).join('|') + ')$'), function (decl) {
			var transform = transforms[decl.prop];
			var syntaxes = transform.syntaxes.slice(0);
			var process = [];
			var passes = !transform.requires;

			postcss.list.space(decl.value).forEach(function (value) {
				if (!passes) {
					passes = transform.requires.test(value);
				}

				syntaxes.some(function (syntax, index) {
					if (syntax.test(value)) {
						process[index] = value;

						if (transform.ordered) {
							syntaxes.slice(0, index + 1).forEach(function (syntax2, index2) {
								delete syntaxes[index2];
							});
						} else {
							delete syntaxes[index];
						}

						return true;
					}
				});
			});

			if (passes) {
				transform.fallbacks.forEach(function (fallback, index) {
					if (process[index] === undefined) {
						process[index] = process[fallback];
					}
				});

				transform.properties.forEach(function (property, index) {
					var value = process[index];

					if (value && value !== '*') {
						decl.cloneBefore({
							prop: property,
							value: value
						});
					}
				});

				decl.removeSelf();
			}
		});
	};
});
