module.exports = {
    plugins: [
        require('postcss-nested'),
        require('postcss-custom-media'),
        require('autoprefixer'),
        require('cssnano'),
        require('postcss-color-mod-function'),
        require('postcss-import'),
    ],
};
