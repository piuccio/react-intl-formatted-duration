import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  entry: 'index.js',
  plugins: [
    babel(),
  ],
  external: Object.keys(pkg.peerDependencies),
  exports: 'named',
  targets: [
    { dest: 'dist/bundle.js', format: 'cjs' },
    { dest: 'dist/module.js', format: 'es' },
  ],
};
