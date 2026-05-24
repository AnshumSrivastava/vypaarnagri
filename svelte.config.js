import adapter from '@sveltejs/adapter-static';
import path from 'path';

const dev = process.env.NODE_ENV === 'development';

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
		paths: {
			base: dev ? '' : '/vypaarnagri'
		},
		alias: {
			$data: path.resolve('./src/data'),
			$lib: path.resolve('./src/lib')
		}
	}
};

export default config;
