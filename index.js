function reduce1to4syntax(values) {
	if (values[3] === values[1]) values.splice(3, 1);
	if (values[3] === undefined && values[2] === values[0]) values.splice(2, 1);
	if (values[2] === undefined && values[1] === values[0]) values.splice(1, 1);

	return values;
}

function filter1to4syntax(properties, values) {
	if (values.length === 4 && values.every(function (value) { return value !== '*'; })) {
		properties.splice(0, 4, properties[0].replace(/-.+/, ''));

		values.splice(0, 4, reduce1to4syntax(values.slice(0, 4)).join(' '));
	}
}

var postcss = require('postcss');

// set css data types
var type = {
	color: /^(\*|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|currentColor|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|inherit|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|#[0-9a-f]+|(hsl|rgb)a?\(.+\))$/i,
	lengthFont: /^(\*|(calc|var)\(.+\)|inherit|initial|large|larger|medium|small|smaller|unset|x-large|x-small|xx-large|xx-small|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))$/,
	lengthLineHeight: /^(\*|(calc|var)\(.+\)|inherit|initial|normal|unset|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw)?)$/i,
	lengthPosition: /^(\*|(calc|var)\(.+\)|auto|inherit|initial|unset|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))$/i,
	lengthFontSpacing: /^(\*|(calc|var)\(.+\)|inherit|initial|normal|unset|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))$/i,
	lengthSize: /^(\*|(calc|var)\(.+\)|auto|available|border-box|content-box|fit-content|inherit|inherit|initial|initial|max-content|min-content|unset|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))$/i,
	lengthSpacing: /^(\*|(calc|var)\(.+\)|inherit|initial|unset|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))$/i
};

// set css syntaxes
var syntax = {
	'color': type.color,
	'bottom': type.lengthPosition,
	'font-size': type.lengthFont,
	'font-style': /^(\*|var\(.+\)|inherit|italic|normal|oblique)$/i,
	'font-stretch': /^(\*|var\(.+\)|condensed|expanded|extra-condensed|extra-expanded|inherit|normal|semi-condensed|semi-expanded|ultra-condensed|ultra-expanded)$/i,
	'font-variant': /^(\*|var\(.+\)|all-petite-caps|all-small-caps|inherit|none|normal|oldstyle-nums|ordinal|petite-caps|slashed-zero|small-caps|stacked-fractions|titling-caps|unicase)$/i,
	'font-weight': /^(\*|var\(.+\)|100|200|300|400|500|600|700|800|900|black|bold|bolder|book|demibold|extrabold|extralight|heavy|inherit|light|lighter|medium|normal|regular|roman|semibold|thin|ultrabold|ultralight)$/i,
	'height': type.lengthSize,
	'left': type.lengthPosition,
	'letter-spacing': type.lengthFontSpacing,
	'line-height': type.lengthLineHeight,
	'margin-bottom': type.lengthSpacing,
	'margin-left': type.lengthSpacing,
	'margin-right': type.lengthSpacing,
	'margin-top': type.lengthSpacing,
	'padding-bottom': type.lengthSpacing,
	'padding-left': type.lengthSpacing,
	'padding-right': type.lengthSpacing,
	'padding-top': type.lengthSpacing,
	'position': /^(\*|var\(.+\)|absolute|fixed|inherit|relative|static|sticky)$/i,
	'right': type.lengthPosition,
	'top': type.lengthPosition,
	'text-align': /^(\*|var\(.+\)|center|end|inherit|justify|left|match-parent|right|start|start-end)$/i,
	'text-decoration': /^(\*|var\(.+\)|blink|inherit|initial|line-through|none|overline|underline)$/i,
	'text-rendering': /^(\*|var\(.+\)|auto|geometricPrecision|inherit|optimizeLegibility|optimizeSpeed)$/i,
	'text-transform': /^(\*|var\(.+\)|capitalize|full-width|inherit|lowercase|none|uppercase)$/i,
	'white-space': /^(\*|var\(.+\)|inherit|normal|nowrap|pre|pre-line|pre-wrap)$/i,
	'width': type.lengthSize,
	'word-spacing': type.lengthFontSpacing
};

// set transforms
var transforms = {
	'margin': {
		properties: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
		fallbacks:  [0, 0, 0, 1],
		filter: filter1to4syntax
	},
	'max-size': {
		properties: ['max-width', 'max-height'],
		fallbacks:  [0, 0]
	},
	'min-size': {
		properties: ['min-width', 'min-height'],
		fallbacks:  [0, 0]
	},
	'padding': {
		properties: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
		fallbacks:  [0, 0, 0, 1],
		filter: filter1to4syntax
	},
	'position': {
		properties: ['position', 'top', 'right', 'bottom', 'left'],
		fallbacks:  [0, 1, 1, 1, 2],
		ordered:    true
	},
	'size': {
		properties: ['width', 'height'],
		fallbacks:  [0, 0]
	},
	'text': {
		properties: ['color', 'font-style', 'font-variant', 'font-weight', 'font-stretch', 'text-decoration', 'text-align', 'text-rendering', 'text-transform', 'white-space', 'font-size', 'line-height', 'letter-spacing', 'word-spacing', 'font-family'],
		fallbacks: []
	},
	'text-spacing': {
		properties: ['letter-spacing', 'word-spacing'],
		fallbacks: []
	}
};

// create plugin
module.exports = postcss.plugin('postcss-short', function (opts) {
	opts = opts || {};

	// set which transforms will run
	var transformList = {};

	Object.keys(transforms).forEach(function (transformName) {
		var allow = 'allow' in opts ? typeof opts.allow === 'object' ? opts.allow.indexOf(transformName) >= 0 : !!opts.allow : true;
		var deny = 'deny' in opts ? typeof opts.deny  === 'object' ? opts.deny.indexOf(transformName) >= 0 : !!opts.deny : false;
		var prefix = 'prefix' in opts ? typeof opts.prefix === 'object' ? opts.prefix[transformName] : opts.prefix : false;

		if (allow && !deny) {
			transformList[prefix ? '-' + prefix + '-' + transformName : transformName] = transforms[transformName];
		}
	});

	// run plugin
	return function (css) {
		// for each declaration with a transform
		css.eachDecl(new RegExp('^(' + Object.keys(transformList).join('|') + ')$'), function (decl) {
			var transform = transformList[decl.prop];
			var properties = transform.properties.slice(0);
			var values = [];

			// for each space-separated value
			postcss.list.space(decl.value).forEach(function (value) {
				// assign a matching value
				properties.some(function (property, index) {
					if (syntax[property].test(value)) {
						values[index] = value;

						if (transform.ordered) {
							properties.slice(0, index + 1).forEach(function (removeProperty, removableIndex) {
								delete properties[removableIndex];
							});
						} else {
							delete properties[index];
						}

						return true;
					}
				});
			});

			// assign value fallbacks
			transform.fallbacks.forEach(function (fallback, index) {
				if (!(index in values)) {
					values[index] = values[fallback];
				}
			});

			// reassign properties
			properties = transform.properties.slice(0);

			// conditionally run filter on properties and values
			if (transform.filter) transform.filter(properties, values);

			// push each property before the current declaration
			values.forEach(function (value, index) {
				if (value && value !== '*') {
					decl.cloneBefore({
						prop: properties[index],
						value: value
					});
				}
			});

			// remove the declaration
			decl.removeSelf();
		});
	};
});

module.exports.process = function (css, opts) {
	var processed = postcss([module.exports(opts)]).process(css, opts);

	return opts && opts.map && !opts.map.inline ? processed : processed.css;
};
