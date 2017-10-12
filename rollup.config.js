import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import tscompile from 'typescript'
import svelte from 'rollup-plugin-svelte'
import buble from 'rollup-plugin-buble'
import closure from 'rollup-plugin-closure-compiler-js'
import filesize from 'rollup-plugin-filesize'

const plugins = [
	resolve(),
	commonjs(),
	typescript({ 'typescript': tscompile }),
	svelte(),
]

if ( process.env.production ) {
	plugins.push(
		buble(),
		closure({
			compilationLevel: 'ADVANCED'
		}),
		filesize(),
	)
}

export default {
	input: 'src/main.ts',
	output: {
		file: 'public/bundle.js',
		format: 'iife',
	},
	name: 'RankIt',
	plugins,
	sourcemap: true
}
