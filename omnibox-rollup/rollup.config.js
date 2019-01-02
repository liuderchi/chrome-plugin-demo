import path from 'path';
import copy from 'rollup-plugin-copy';

const SOURCE_PATH = 'src';
const BUILD_PATH = 'dist';

export default {
  input: ['src/index.js'],
  output: {
    file: path.join(BUILD_PATH, 'bundle.js'),
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    copy({
      [path.join(SOURCE_PATH, 'images', 'icon.png')]: path.join(
        BUILD_PATH,
        'img/icon.png',
      ),
      [path.join(SOURCE_PATH, 'manifest.json')]: path.join(
        BUILD_PATH,
        'manifest.json',
      ),
    }),
  ],
};
