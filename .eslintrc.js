module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		node: true,
		commonjs: true,
		es6: true,
	},
	rules: {
		'@bem-react/whitelist-levels-imports': [
			'error',
			{
				defaultLevel: 'common',
				whiteList: {
					common: ['common'],
					desktop: ['common', 'desktop'],
					mobile: ['common', 'mobile'],
				},
			},
		],
		'sort-class-members/sort-class-members': [
			2,
			{
				order: [
					'[static-properties]',
					'[static-methods]',
					'[properties]',
					'[conventional-private-properties]',
					'constructor',
					'[methods]',
					'[conventional-private-methods]',
				],
				accessorPairPositioning: 'getThenSet',
			},
		],
		'padding-line-between-statements': [
			'error',
			{ blankLine: 'always', prev: '*', next: 'return' },
			{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
			{ blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
			{ blankLine: 'always', prev: 'directive', next: '*' },
			{ blankLine: 'any', prev: 'directive', next: 'directive' },
		],
		'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
	},
	plugins: ['@typescript-eslint', 'react-hooks', '@bem-react', 'sort-class-members'],
	ignorePatterns: ['node_modules/', 'build/', '.vscode/'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended',
	],
};
