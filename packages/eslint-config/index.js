import base from './lib/base.js';
import javascript from './lib/javascript.js';
import prettier from './lib/prettier.js';
import react from './lib/react.js';
import typescript from './lib/typescript.js';
import vue from './lib/vue.js';

export default [
  {
    ...base,
  },
  {
    ...javascript,
  },
  {
    ...typescript,
  },
  {
    ...react,
  },
  {
    ...vue,
  },
  {
    ...prettier,
  },
];
