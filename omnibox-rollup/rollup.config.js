import copy from 'rollup-plugin-copy';

export default {
  input: ['src/index.js'],
  output: [
    // ES module version, for modern browsers
    {
      dir: 'public',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    copy({
      'src/static/img/icon.png': 'public/img/icon.png',
      'src/static/manifest.json': 'public/manifest.json',
    }),
  ],
};
