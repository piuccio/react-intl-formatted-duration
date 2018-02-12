import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  input: 'index.js',
  plugins: [
    babel(),
  ],
  external: Object.keys(pkg.peerDependencies),
  output: [{
    exports: 'named',
    file: 'dist/bundle.js',
    format: 'cjs',
  }, {
    file: 'dist/module.js',
    format: 'es',
  }],
};
