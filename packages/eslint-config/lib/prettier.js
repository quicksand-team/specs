import prettierConfig from 'eslint-config-prettier';

const rules = Object.keys(prettierConfig.rules).reduce((acc, rule) => {
  if (prettierConfig.rules[rule] === 0) {
    acc[rule] = 'off';
  } else if (prettierConfig.rules[rule] === 1) {
    acc[rule] = 'warn';
  } else if (prettierConfig.rules[rule] === 2) {
    acc[rule] = 'error';
  } else {
    acc[rule] = prettierConfig.rules[rule];
  }
  return acc;
}, {});

export default {
  rules,
};
