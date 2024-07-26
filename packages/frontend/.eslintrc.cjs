module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'prettier'],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
      },
    },
  },
};
