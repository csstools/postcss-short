var assign  = require('object-assign');
var postcss = require('postcss');

var postCSSShortBorder = require('postcss-short-border');
var postCSSShortBorderRadius = require('postcss-short-border-radius');
var postCSSShortColor = require('postcss-short-color');
var postCSSShortFontSize = require('postcss-short-font-size');
var postCSSShortPosition = require('postcss-short-position');
var postCSSShortSize = require('postcss-short-size');
var postCSSShortSpacing = require('postcss-short-spacing');
var postCSSShortText = require('postcss-short-text');
var postCSSFontWeights = require('postcss-font-weights');
var postCSSShortData = require('postcss-short-data');

var processors = [
	{
		plugin:    postCSSShortBorder,
		namespace: 'border',
		defaults:  {}
	},
	{
		plugin:    postCSSShortBorderRadius,
		namespace: 'border-radius',
		defaults:  {}
	},
	{
		plugin:    postCSSShortColor,
		namespace: 'color',
		defaults:  {}
	},
	{
		plugin:    postCSSShortFontSize,
		namespace: 'font-size',
		defaults:  {}
	},
	{
		plugin:    postCSSShortPosition,
		namespace: 'position',
		defaults:  {}
	},
	{
		plugin:    postCSSShortSize,
		namespace: 'size',
		defaults:  {}
	},
	{
		plugin:    postCSSShortSpacing,
		namespace: 'spacing',
		defaults:  {}
	},
	{
		plugin:    postCSSShortText,
		namespace: 'text',
		defaults:  {}
	},
	{
		plugin:    postCSSFontWeights,
		namespace: 'font-weight',
		defaults:  {}
	},
	{
		plugin:    postCSSShortData,
		namespace: 'data',
		defaults:  {}
	}
];

module.exports = postcss.plugin('postcss-short', function (rawOpts) {
	var opts = assign({}, rawOpts);

	var instance = postcss();

	processors.forEach(function (processor) {
		var namespaceOptions = processor.namespace in opts ? opts[processor.namespace] : opts;
		var processorOptions = {};

		processorOptions = assign({}, processor.defaults, namespaceOptions);

		if (namespaceOptions && !processorOptions.disable) {
			instance.use(processor.plugin(processorOptions));
		}
	});

	return instance;
});
