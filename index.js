// tooling
const postcss = require('postcss');

// plugins by name
const plugins = {
	border: 'postcss-short-border',
	borderRadius: 'postcss-short-border-radius',
	color: 'postcss-short-color',
	fontSize: 'postcss-short-font-size',
	position: 'postcss-short-position',
	size: 'postcss-short-size',
	spacing: 'postcss-short-spacing',
	fontWeights: 'postcss-font-weights'
};

// plugin
module.exports = postcss.plugin('postcss-short', (opts = {}) => {
	// cached processor
	const processor = postcss();

	Object.keys(plugins).forEach((name) => {
		// options by name
		const pluginOpts = Object.assign({
			disable: opts[name] === false
		}, opts[name]);

		if (!pluginOpts.disable) {
			// cached plugin
			const plugin = plugins[name] = typeof plugins[name] === 'string' ? require(plugins[name]) : plugins[name];

			// use the plugin with the processor
			processor.use(plugin(pluginOpts));
		}
	});

	return processor;
});
