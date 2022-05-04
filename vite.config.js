import htmlPurge from 'vite-plugin-html-purgecss'
import { imagetools } from 'vite-imagetools'

const htmlMinifier = require("rollup-plugin-html-minifier")
const {resolve} = require('path')

export default {
    build: {
        minify: "esbuild",
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                kufstein: resolve(__dirname, 'kufstein/index.html'),
                landeck: resolve(__dirname, 'landeck/index.html'),
                wipptal: resolve(__dirname, 'wipptal/index.html'),
                imst: resolve(__dirname, 'imst/index.html'),
                telfs: resolve(__dirname, 'telfs/index.html'),
                kramsach: resolve(__dirname, 'kramsach/index.html'),
                // images: resolve(__dirname, 'images/*'),
            }
        }
    },
    plugins: [
        htmlMinifier({
            collapseWhitespace: true,
        }),
        imagetools(),
        htmlPurge(),
    ]
}
