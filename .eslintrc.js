module.exports = {
	"extends": "airbnb",
	"parserOptions": {
		"ecmaVersion": 6
	},
	"env": {
		"browser": true,
		"node": true,
		"es6": true
	},
	"rules": {
		"no-restricted-syntax": 0,
		"camelcase": 1,
		"eqeqeq": 2,
		"no-tabs": 0,
		"no-unused-vars": 0,
		"indent": ["error", "tab"],
		"quotes": ["error", "single", {"allowTemplateLiterals": true}],
		"max-len": ["error", {
			"code": 100,
			"ignoreComments": true,
			"ignoreTrailingComments": true,
			"ignoreUrls": true,
			"ignoreStrings": true,
			"ignoreTemplateLiterals": true
		}],
		"strict": [0, "global"],
		"global-require": 0,
		"prefer-arrow-callback": 0,
		"comma-dangle": 0,
		"no-console": 0,
		"func-names": 0,
		"eol-last": 2,
		"no-plusplus": 0,
		"arrow-parens": 0,
		"wrap-iife": 0,
		"no-param-reassign": 0,
		"prefer-template": 0,
		"no-underscore-dangle": 0,
		"padded-blocks": 0,
		"consistent-return": 0,
		"class-methods-use-this": 0,
		"no-use-before-define": 0,
		"object-curly-spacing": 0,
		"newline-per-chained-call": 1,
		"guard-for-in": 0,
		"import/no-extraneous-dependencies": 0

	}
};