export default {
  '!(*.d).{ts,tsx}': 'eslint --fix --max-warnings 0',
  '*.{cjs,mjs,js,json,jsx,d.ts}': 'prettier --write',
}
