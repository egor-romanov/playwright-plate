module.exports = {
  'env': {
    'es6': true,
    'browser': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2020,
    'sourceType': 'module',
    'ecmaFeatures': {
      'spread': true,
      'jsx': true,
      'experimentalObjectRestSpread': true,
    },
  },
  'rules': {
    'no-var': ['error',],
    'curly': ['error', 'all',],
    'keyword-spacing': ['error', { 'before': true, 'after': true, },],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    },],
    'quotes': ['error', 'single', { 'avoidEscape': true, },],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': false, },],
    'linebreak-style': ['error', 'unix',],
    'strict': ['error', 'global',],
    'semi': ['error', 'always',],
    'indent': ['error', 2, { 'SwitchCase': 1, },],
    'object-curly-spacing': ['error', 'always',],
    'no-async-promise-executor': 'off',
    'comma-dangle': ['error', {
      'arrays': 'always',
      'objects': 'always',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    },],
    'no-unused-vars': 'off',
  },
  'overrides': [
    {
      'files': [
        '*.ts',
        '*.tsx',
      ],
      'parser': '@typescript-eslint/parser',
      'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      'rules': {
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
