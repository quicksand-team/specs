module.exports = {
  '**/*.{js,cjs,mjs,jsx,cjsx,mjsx,ts,cts,mts,tsx,ctsx,mtsx,vue,nvue}': [
    'eslint --fix',
  ],
  '**/*': ['prettier --write --ignore-unknown'],
};
