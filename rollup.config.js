import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import image from '@rollup/plugin-image';
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
  input: 'src/index.js',
  output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: 'docs/pages/trex/index.js'
  },
  plugins: [
    babel({
      targets: {
        chrome: '90'
      },
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@babel/plugin-transform-arrow-functions',
        '@babel/plugin-transform-async-to-generator'
      ],
      exclude: 'node_modules/**'
    }),
    image(),
    commonjs(),
    minify(),
    uglify(),
  ]
}
