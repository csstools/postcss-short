var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
	postcss([ plugin(opts) ]).process(input).then(function (result) {
		expect(result.css).to.eql(output);

		expect(result.warnings()).to.be.empty;

		done();
	}).catch(function (error) {
		done(error);
	});
};

describe('postcss-short: margin', function () {
	// 1 value
	it('1 length value', function (done) {
		test('a{ margin: 100px; }', 'a{ margin: 100px; }', { }, done);
	});

	it('1 asterisk value', function (done) {
		test('a{ margin: *; }', 'a{ }', { }, done);
	});

	// 2 values
	it('2 length values', function (done) {
		test('a{ margin: 100px 50px; }', 'a{ margin: 100px 50px; }', { }, done);
	});

	it('1 length value, 1 asterisk value', function (done) {
		test('a{ margin: 100px *; }', 'a{ margin-top: 100px; margin-bottom: 100px; }', { }, done);
	});

	it('1 asterisk value, 1 length value', function (done) {
		test('a{ margin: * 100px; }', 'a{ margin-right: 100px; margin-left: 100px; }', { }, done);
	});

	it('2 asterisk values', function (done) {
		test('a{ margin: * *; }', 'a{ }', { }, done);
	});

	// 3 values
	it('3 length values', function (done) {
		test('a{ margin: 100px 50px 25px; }', 'a{ margin: 100px 50px 25px; }', { }, done);
	});

	it('2 length values, 1 asterisk value', function (done) {
		test('a{ margin: 100px 50px *; }', 'a{ margin-top: 100px; margin-right: 50px; margin-left: 50px; }', { }, done);
	});

	it('2 asterisk values, 1 length value', function (done) {
		test('a{ margin: * * 25px; }', 'a{ margin-bottom: 25px; }', { }, done);
	});

	it('3 asterisk values', function (done) {
		test('a{ margin: * * *; }', 'a{ }', { }, done);
	});

	// 4 values
	it('4 length values', function (done) {
		test('a{ margin: 100px 50px 25px 10px; }', 'a{ margin: 100px 50px 25px 10px; }', { }, done);
	});

	it('3 length values, 1 asterisk value', function (done) {
		test('a{ margin: 100px 50px 25px *; }', 'a{ margin-top: 100px; margin-right: 50px; margin-bottom: 25px; }', { }, done);
	});

	it('2 length values, 2 asterisk values', function (done) {
		test('a{ margin: 100px 50px * *; }', 'a{ margin-top: 100px; margin-right: 50px; }', { }, done);
	});

	it('3 asterisk values, 1 length values', function (done) {
		test('a{ margin: * * * 10px; }', 'a{ margin-left: 10px; }', { }, done);
	});

	it('4 asterisk values', function (done) {
		test('a{ margin: * * * *; }', 'a{ }', { }, done);
	});
});

describe('postcss-short: padding', function () {
	// 1 value
	it('1 length value', function (done) {
		test('a{ padding: 100px; }', 'a{ padding: 100px; }', { }, done);
	});

	it('1 asterisk value', function (done) {
		test('a{ padding: *; }', 'a{ }', { }, done);
	});

	// 2 values
	it('2 length values', function (done) {
		test('a{ padding: 100px 50px; }', 'a{ padding: 100px 50px; }', { }, done);
	});

	it('1 length value, 1 asterisk value', function (done) {
		test('a{ padding: 100px *; }', 'a{ padding-top: 100px; padding-bottom: 100px; }', { }, done);
	});

	it('1 asterisk value, 1 length value', function (done) {
		test('a{ padding: * 100px; }', 'a{ padding-right: 100px; padding-left: 100px; }', { }, done);
	});

	it('2 asterisk values', function (done) {
		test('a{ padding: * *; }', 'a{ }', { }, done);
	});

	// 3 values
	it('3 length values', function (done) {
		test('a{ padding: 100px 50px 25px; }', 'a{ padding: 100px 50px 25px; }', { }, done);
	});

	it('2 length values, 1 asterisk value', function (done) {
		test('a{ padding: 100px 50px *; }', 'a{ padding-top: 100px; padding-right: 50px; padding-left: 50px; }', { }, done);
	});

	it('2 asterisk values, 1 length value', function (done) {
		test('a{ padding: * * 25px; }', 'a{ padding-bottom: 25px; }', { }, done);
	});

	it('3 asterisk values', function (done) {
		test('a{ padding: * * *; }', 'a{ }', { }, done);
	});

	// 4 values
	it('4 length values', function (done) {
		test('a{ padding: 100px 50px 25px 10px; }', 'a{ padding: 100px 50px 25px 10px; }', { }, done);
	});

	it('3 length values, 1 asterisk value', function (done) {
		test('a{ padding: 100px 50px 25px *; }', 'a{ padding-top: 100px; padding-right: 50px; padding-bottom: 25px; }', { }, done);
	});

	it('2 length values, 2 asterisk values', function (done) {
		test('a{ padding: 100px 50px * *; }', 'a{ padding-top: 100px; padding-right: 50px; }', { }, done);
	});

	it('3 asterisk values, 1 length values', function (done) {
		test('a{ padding: * * * 10px; }', 'a{ padding-left: 10px; }', { }, done);
	});

	it('4 asterisk values', function (done) {
		test('a{ padding: * * * *; }', 'a{ }', { }, done);
	});
});

describe('postcss-short: position', function () {
	// 1 value
	it('1 position value', function (done) {
		test('a{ position: absolute; }', 'a{ position: absolute; }', { }, done);
	});

	it('1 length value', function (done) {
		test('a{ position: 0; }', 'a{ top: 0; right: 0; bottom: 0; left: 0; }', { }, done);
	});

	it('1 asterisk value', function (done) {
		test('a{ position: *; }', 'a{ }', { }, done);
	});

	// 2 values
	it('1 position value, 1 length value', function (done) {
		test('a{ position: absolute 0; }', 'a{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; }', { }, done);
	});

	it('2 length values', function (done) {
		test('a{ position: 0 20px; }', 'a{ top: 0; right: 20px; bottom: 0; left: 20px; }', { }, done);
	});

	it('1 position value, 1 asterisk value', function (done) {
		test('a{ position: absolute *; }', 'a{ position: absolute; }', { }, done);
	});

	it('1 length value, 1 asterisk value', function (done) {
		test('a{ position: 0 *; }', 'a{ top: 0; bottom: 0; }', { }, done);
	});

	it('1 asterisk value, 1 length value', function (done) {
		test('a{ position: * 0; }', 'a{ top: 0; right: 0; bottom: 0; left: 0; }', { }, done);
	});

	// 3 values
	it('1 position value, 2 length values', function (done) {
		test('a{ position: absolute 0 20px; }', 'a{ position: absolute; top: 0; right: 20px; bottom: 0; left: 20px; }', { }, done);
	});

	it('3 length values', function (done) {
		test('a{ position: 0 20px 10px; }', 'a{ top: 0; right: 20px; bottom: 10px; left: 20px; }', { }, done);
	});

	it('1 position value, 1 length value, 1 asterisk value', function (done) {
		test('a{ position: absolute 0 *; }', 'a{ position: absolute; top: 0; bottom: 0; }', { }, done);
	});

	it('2 length values, 1 asterisk value', function (done) {
		test('a{ position: 0 20px *; }', 'a{ top: 0; right: 20px; left: 20px; }', { }, done);
	});

	it('1 position value, 1 asterisk value, 1 length value', function (done) {
		test('a{ position: absolute * 0; }', 'a{ position: absolute; right: 0; left: 0; }', { }, done);
	});

	it('3 asterisk values', function (done) {
		test('a{ position: * * *; }', 'a{ }', { }, done);
	});

	// 4 values
	it('1 position value, 3 length values', function (done) {
		test('a{ position: absolute 0 20px 10px; }', 'a{ position: absolute; top: 0; right: 20px; bottom: 10px; left: 20px; }', { }, done);
	});

	it('4 length values', function (done) {
		test('a{ position: 0 20px 10px 5px; }', 'a{ top: 0; right: 20px; bottom: 10px; left: 5px; }', { }, done);
	});

	it('1 position value, 2 length values, 1 asterisk value', function (done) {
		test('a{ position: absolute 0 20px *; }', 'a{ position: absolute; top: 0; right: 20px; left: 20px; }', { }, done);
	});

	it('1 asterisk value, 3 length values', function (done) {
		test('a{ position: * 0 20px 10px; }', 'a{ top: 0; right: 20px; bottom: 10px; left: 20px; }', { }, done);
	});

	it('1 position value, 1 length value, 2 asterisk values', function (done) {
		test('a{ position: absolute 0 * *; }', 'a{ position: absolute; top: 0; }', { }, done);
	});

	it('1 position value, 2 asterisk values, 1 length values', function (done) {
		test('a{ position: absolute * * 10px; }', 'a{ position: absolute; bottom: 10px; }', { }, done);
	});

	it('1 asterisk value, 2 length values, 1 asterisk value', function (done) {
		test('a{ position: * 0 20px *; }', 'a{ top: 0; right: 20px; left: 20px; }', { }, done);
	});

	it('1 position value, 3 asterisk values', function (done) {
		test('a{ position: absolute * * *; }', 'a{ position: absolute; }', { }, done);
	});

	it('3 asterisk values, 1 length values', function (done) {
		test('a{ position: * * * 10px; }', 'a{ bottom: 10px; }', { }, done);
	});

	it('4 asterisk values', function (done) {
		test('a{ position: * * * *; }', 'a{ }', { }, done);
	});
});

describe('postcss-short: size', function () {
	// 1 value
	it('1 length value', function (done) {
		test('a{ size: 100px; }', 'a{ width: 100px; height: 100px; }', { }, done);
	});

	it('1 asterisk value', function (done) {
		test('a{ size: *; }', 'a{ }', { }, done);
	});

	// 2 values
	it('2 length values', function (done) {
		test('a{ size: 100px 50px; }', 'a{ width: 100px; height: 50px; }', { }, done);
	});

	it('1 length value, 1 asterisk', function (done) {
		test('a{ size: 100px *; }', 'a{ width: 100px; }', { }, done);
	});

	it('1 asterisk value, 1 length value', function (done) {
		test('a{ size: * 100px; }', 'a{ height: 100px; }', { }, done);
	});

	it('2 asterisk values', function (done) {
		test('a{ size: * *; }', 'a{ }', { }, done);
	});
});

describe('postcss-short: text', function () {
	it('1 color value', function (done) {
		test('a{ text: red; }', 'a{ color: red; }', { }, done);
	});

	it('1 color value', function (done) {
		test('a{ text: #F00; }', 'a{ color: #F00; }', { }, done);
	});

	it('1 font-style value', function (done) {
		test('a{ text: italic; }', 'a{ font-style: italic; }', { }, done);
	});

	it('1 font-weight value', function (done) {
		test('a{ text: 400; }', 'a{ font-weight: 400; }', { }, done);
	});

	it('1 font-weight value', function (done) {
		test('a{ text: bold; }', 'a{ font-weight: bold; }', { }, done);
	});

	it('4 values', function (done) {
		test('a{ text: bold italic uppercase 16px; }', 'a{ font-style: italic; font-weight: bold; text-transform: uppercase; font-size: 16px; }', { }, done);
	});

	it('6 values', function (done) {
		test('a{ text: bold italic uppercase 16px 20px .05em; }', 'a{ font-style: italic; font-weight: bold; text-transform: uppercase; font-size: 16px; line-height: 20px; letter-spacing: .05em; }', { }, done);
	});

	it('8 values', function (done) {
		test('a{ text: bold italic red uppercase 16px 20px .05em optimizeLegibility; }', 'a{ color: red; font-style: italic; font-weight: bold; text-rendering: optimizeLegibility; text-transform: uppercase; font-size: 16px; line-height: 20px; letter-spacing: .05em; }', { }, done);
	});
});


describe('postcss-short: options', function () {
	it('prefixed', function (done) {
		test('a{ -s-position: 0 * *; }', 'a{ top: 0; }', { prefix: 's' }, done);
	});

	it('selectively prefixed', function (done) {
		test('a{ -s-position: 0 * *; }', 'a{ top: 0; }', { prefix: { position: 's' } }, done);
	});

	it('selectively (not) prefixed', function (done) {
		test('a{ -s-position: 0 * *; }', 'a{ -s-position: 0 * *; }', { prefix: { top: 's' } }, done);
	});

	it('totally allowed', function (done) {
		test('a{ position: 0 * *; }', 'a{ top: 0; }', { allow: true }, done);
	});

	it('totally denied', function (done) {
		test('a{ position: 0 * *; }', 'a{ position: 0 * *; }', { deny: true }, done);
	});

	it('selectively allowed', function (done) {
		test('a{ position: 0 * *; }', 'a{ top: 0; }', { allow: ['position'] }, done);
	});

	it('selectively (not) allowed', function (done) {
		test('a{ position: 0 * *; }', 'a{ position: 0 * *; }', { allow: ['text'] }, done);
	});

	it('selectively denied', function (done) {
		test('a{ position: 0 * *; }', 'a{ position: 0 * *; }', { deny: ['position'] }, done);
	});

	it('selectively (not) denied', function (done) {
		test('a{ position: 0 * *; }', 'a{ top: 0; }', { deny: ['text'] }, done);
	});
});
