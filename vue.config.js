const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
    // css bundled in JS
    lintOnSave: false,
    css: {
        extract: false,
    },
    configureWebpack: {
        plugins: [
            // DOC: https://github.com/webpack-contrib/stylelint-webpack-plugin
            new StyleLintPlugin({
                files: ['**/*.{vue,htm,html,css,sss,less,scss,sass,!snap}'],
            }),
        ],
    },
}
