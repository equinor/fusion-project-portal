import tsdoc from 'eslint-plugin-tsdoc';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: [
			'**/*.md',
			'**/*.svg',
			'**/*.d.ts',
			'**/*.ico',
			'**/*.html',
			'**/*.js',
			'**/coverage/**/*',
			'**/*.jpg',
			'**/*.png',
		],
	},
	...compat.extends('plugin:@typescript-eslint/recommended'),
	{
		plugins: {
			tsdoc,
		},

		languageOptions: {
			parser: tsParser,
		},

		rules: {
			'tsdoc/syntax': 'warn',
			'prefer-destructuring': 'off',
			'prefer-arrow-callback': 'warn',
			'prefer-const': 'warn',
			'lines-between-class-members': 'warn',
			'class-methods-use-this': 'warn',
			curly: ['error', 'multi-line'],

			'default-case': [
				'error',
				{
					commentPattern: '^no default$',
				},
			],

			'max-classes-per-file': ['error', 1],
			'no-constructor-return': 'error',

			'no-empty-function': [
				'error',
				{
					allow: ['arrowFunctions', 'functions', 'methods'],
				},
			],

			'no-eval': 'error',
			'no-lone-blocks': 'error',
			'no-loop-func': 'error',
			'no-new-func': 'error',
			'no-redeclare': 'error',
			'no-return-assign': ['error', 'always'],
			'@typescript-eslint/no-unused-vars': 'off',
			'no-self-assign': [
				'error',
				{
					props: true,
				},
			],

			'no-self-compare': 'error',
			'no-throw-literal': 'error',
			'no-useless-catch': 'error',
			'no-useless-return': 'error',
			'no-restricted-globals': 'off',
		},
	},
];
