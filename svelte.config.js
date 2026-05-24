import adapter from '@sveltejs/adapter-static';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: false
		}),
		alias: {
			$data: path.resolve('./src/data'),
			$lib: path.resolve('./src/lib')
		}
	}
};

export default config;
