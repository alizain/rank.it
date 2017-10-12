import typescript from 'rollup-plugin-typescript2'
import svelte from 'rollup-plugin-svelte'
import buble from 'rollup-plugin-buble'
import closure from 'rollup-plugin-closure-compiler-js'
import filesize from 'rollup-plugin-filesize'

const plugins = [
	typescript(),
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
	entry: 'lib/ranking.ts',
	dest: 'public/bundle.js',
	format: 'iife',
	name: 'something',
	plugins,
	sourceMap: true
}
