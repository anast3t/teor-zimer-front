module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@vue/typescript/recommended',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		semi: ['error', 'always'],
		// indent: ["error", "tab", {"SwitchCase": 1}],
		'max-len': ['error', { code: 120 }],
		'vue/max-len': ['error', { code: 120 }],
		'vue/html-self-closing': ['error', {
			html: {
				void: 'never',
				normal: 'always',
				component: 'always'
			},
			svg: 'always',
			math: 'always'
		}],
		'vue/html-indent': [
			'error',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		],
		'vue/max-attributes-per-line': ['error', {
			singleline: {
				max: 1
			},
			multiline: {
				max: 1
			}
		}],
		// "vue/first-attribute-linebreak": ["error", {
		// 	"singleline": "beside",
		// 	"multiline": "below"
		// }],
		'vue/no-unused-components': ['warn'],
		'vue/no-setup-props-destructure': 'off',
		'@typescript-eslint/indent': ['error', 'tab', { 'SwitchCase': 1 }],
		'@typescript-eslint/no-unused-vars': 'off'
	},
};
