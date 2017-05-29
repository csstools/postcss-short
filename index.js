// tooling
const postcss = require('postcss');

// plugins by name
const plugins = {
	border:       require('postcss-short-border'),
	borderRadius: require('postcss-short-border-radius'),
	color:        require('postcss-short-color'),
	fontSize:     require('postcss-short-font-size'),
	overflow:     require('postcss-overflow'),
	position:     require('postcss-short-position'),
	size:         require('postcss-short-size'),
	spacing:      require('postcss-short-spacing'),
	fontWeights:  require('postcss-font-weights')
};

// plugin
module.exports = postcss.plugin('postcss-short', (rawopts) => {
	// options
	const opts = Object.assign({}, rawopts);

	// cached processor
	const processor = postcss();

	// for each plugin
	Object.keys(plugins).forEach(
		(name) => {
			// plugin options by name
			const pluginOpts = Object.assign({
				disable: opts[name] === false
			}, opts[name]);

			// if the plugin is not disabled
			if (!pluginOpts.disable) {
				// use the plugin
				processor.use(
					plugins[name](pluginOpts)
				);
			}
		}
	);

	return processor;
});
