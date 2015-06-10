#!/usr/bin/env node

var postcss = require('postcss');
var space = postcss.list.space;
var vars = require('./index.vars.js');
var push = Array.prototype.push;

module.exports = postcss.plugin('short', function (opts) {
	opts = opts || {};

	return function (css) {
		// get formatted, spaced values
		function getFormattedSpacedValues(value, map) {
			var values = space(value);
			var index;

			if (values.length) {
				for (index in map) {
					values[index] = index in values ? values[index] : values[map[index]];
				}
			}

			return values.slice(0, map.length);
		}

		// create alternate selectors
		function createAlternateSelectors(filter, replacements) {
			// for each rule
			css.eachRule(function (rule) {
				// create the future rule selector
				var selectors = [];

				// for each selector
				rule.selectors.forEach(function (selector) {
					// if the selector matches the filter
					if (filter.test(selector)) {
						// push each matching, filtered selector into the future rule selector  
						push.apply(selectors, replacements.map(function (replacement) {
							return selector.replace(filter, replacement);
						}));
					}
					// otherwise
					else {
						// push the original selector
						selectors.push(selector);
					}
				});

				// set the selector as the future selector
				rule.selectors = selectors;
			});
		}

		// create alternate declarations
		function createAlternateDeclarations(filter, replacements, transformMap) {
			// for each matching declaration
			css.eachDecl(filter, function (decl) {
				// for each formatted, spaced value 
				getFormattedSpacedValues(decl.value, transformMap).forEach(function (value, index) {
					// if * is not the value
					if ('*' !== value) {
						// create an alternate declaration
						decl.cloneBefore({
							prop: replacements[index],
							value: value
						});
					}
				});

				// remove the declaration
				decl.removeSelf();
			});
		}

		// create expanded declarations
		function createExpandedDeclarations(filter, propertyListListOriginal) {
			// for each matching declaration
			css.eachDecl(filter, function (decl) {
				// create a clone of the property list list
				var propertyListList = propertyListListOriginal.slice(0);

				// prepare other variables
				var propertyList;
				var propertyListIndex = 0;
				var propertyName;
				var propertyNameIndex;
				var match;

				// for each space-separated value in the declaration value
				space(decl.value).forEach(function (value) {
					// for each property list
					while ((propertyList = propertyListList[propertyListIndex])) {
						propertyNameIndex = 0;

						// for each property name
						while ((propertyName = propertyList[propertyNameIndex])) {
							// get the match for the property name
							match = vars.match[propertyName];

							// if the value passes the match
							if (match.test(value)) {
								// remove the property name from future matches
								propertyList.splice(propertyNameIndex, 1);

								// if * is not the value
								if ('*' !== value) {
									// create a new declaration
									decl.cloneBefore({
										prop: propertyName,
										value: value
									});
								}

								// advance to next space-separated value
								return;
							}

							// advance to next property name
							++propertyNameIndex;
						}

						// advance to next property list
						++propertyListIndex;
					}
				});

				// remove the declaration
				decl.removeSelf();
			});
		}

		// create an expanded value
		function createExpandedValue(filter) {
			var object = vars.object[filter];

			css.eachDecl(filter, function (decl) {
				var value = decl.value.replace(/-/g, '').toLowerCase();

				if (value in object) {
					decl.value = object[value];
				}
			});
		}

		// create a prefixed string
		function prefix(string) {
			return opts.prefix ? '-' + opts.prefix + '-' + string : string;
		}

		// create alternate selectors
		createAlternateSelectors(new RegExp('\\b::' + prefix('around') + '\\b'), ['::before', '::after']);
		createAlternateSelectors(new RegExp('\\b:' + prefix('over') + '\\b'), [':focus', ':hover']);

		// create alternate declarations
		createAlternateDeclarations(prefix('margin'), ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'], [0, 0, 0, 1]);
		createAlternateDeclarations(prefix('max-size'), ['max-width', 'max-height'], [0, 0]);
		createAlternateDeclarations(prefix('min-size'), ['min-width', 'min-height'], [0, 0]);
		createAlternateDeclarations(prefix('padding'), ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'], [0, 0, 0, 1]);
		createAlternateDeclarations(prefix('position'), ['position', 'top', 'right', 'bottom', 'left'], [0, 1, 1, 1, 2]);
		createAlternateDeclarations(prefix('size'), ['width', 'height'], [0, 0]);

		// create expanded declarations
		createExpandedDeclarations(prefix('text'), [['color', 'font-style', 'font-variant', 'font-weight', 'font-stretch', 'text-decoration', 'text-align', 'text-rendering', 'text-transform', 'white-space'], ['font-size'], ['line-height'], ['letter-spacing'], ['word-spacing'], ['font-family']]);

		// create expanded values
		createExpandedValue('color');
		createExpandedValue('font-weight');
	};
});
