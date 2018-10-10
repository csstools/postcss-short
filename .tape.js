module.exports = {
	'postcss-short': {
		'basic': {
			message: 'supports basic usage'
		},
		'basic:disable': {
			message: 'supports { features { fontWeights: false } } usage',
			options: {
				features: {
					fontWeights: false
				}
			}
		},
		'prefix': {
			message: 'supports { prefix: "x" } usage',
			options: {
				prefix: 'x'
			},
			expect: 'basic.expect.css'
		}
	}
};
