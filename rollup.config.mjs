import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    external: ['react-dom'],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
 
      resolve(),
      commonjs(),
      replace({
        'Object.defineProperty(exports, "__esModule", { value: true });': '',
         delimiters: ['\n', '\n']
      }),
      typescript({tsconfig: './tsconfig.json'}),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'esm'}],
    plugins: [dts()]
  }
  
]