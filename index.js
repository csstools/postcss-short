import postcss from 'postcss';// plugins by name
import plugins from './lib/plugins';

export default postcss.plugin('postcss-short', opts => {
	const features = Object.assign({}, Object(opts).features);
	const pluginOpts = {};

	if ('prefix' in Object(opts)) {
		pluginOpts.prefix = opts.prefix;
	}

	if ('skip' in Object(opts)) {
		pluginOpts.skip = opts.skip;
	}

	const enabledPlugins = Object.keys(plugins).reduce(
		(array, name) => features[name] === false
			? array
		: array.concat(
			plugins[name](
				Object.assign({}, pluginOpts, features[name])
			)
		),
		[]
	);

	return (root, result) => enabledPlugins.reduce(
		(promise, plugin) => promise.then(
			() => plugin(result.root, result)
		),
		Promise.resolve()
	);
});
