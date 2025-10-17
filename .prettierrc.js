module.exports = {
  // 기본 설정
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  // JSX 설정
  jsxSingleQuote: true,
  jsxBracketSameLine: false,

  // 기타 설정
  arrowParens: 'avoid',
  endOfLine: 'lf',
  bracketSpacing: true,
  bracketSameLine: false,

  // 파일별 설정
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.scss',
      options: {
        singleQuote: false,
      },
    },
  ],
};
