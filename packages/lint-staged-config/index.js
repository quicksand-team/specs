module.exports = {
  '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue,nvue}': ['eslint --fix'],
  '**/*': ['prettier --write --ignore-unknown'],
};
