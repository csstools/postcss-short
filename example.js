/*
 * Add your CSS code here.
 * See https://github.com/jonathantneal/postcss-short#features for more examples
 */

const css = `
.banner {
	color: #abccfc #212231;
	font-size: 1.5em/2;
	font-weight: light;
	position: fixed 0 0 *;
	size: 100% 48px;
}

.section {
	border-top-radius: 50px;
	margin: 40px;
}

.section.inset {
	margin: * auto;
}
`;

/*
 * Add your plugin configuration here; see
 * https://github.com/jonathantneal/postcss-short#options for more details.
 */

const pluginOptions = {};

/*
 * Add your process configuration here; see
 * http://api.postcss.org/global.html#processOptions for more details.
 */

const processOptions = {};

/*
 * Process the CSS and log it to the console.
 */

require('postcss-short').process(css, pluginOptions, processOptions).then(result => {
    console.log(result.css);
});
