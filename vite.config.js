import { defineConfig } from 'vite';
import bba from './plugins/vite-plugin-bba.js';

export default defineConfig({
    plugins: [
        bba(
            {
                fileRegex: /\.bba$/
            }
        )
    ],
});
