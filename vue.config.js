const path = require('path')
const { mergeSassVariables } = require('@vuetify/cli-plugin-utils')

module.exports = {
  publicPath: '/',
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@envParams': path.resolve(__dirname, '.env.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@axios': path.resolve(__dirname, 'src/plugins/axios.js'),
        '@user-variables': path.resolve(__dirname, 'src/styles/variables.scss'),
        apexcharts: path.resolve(__dirname, 'node_modules/apexcharts-clevision'),
      },
    },
  },
  chainWebpack: config => {
    const modules = ['vue-modules', 'vue', 'normal-modules', 'normal']
    modules.forEach(match => {
      config.module
        .rule('sass')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => mergeSassVariables(opt, "'@/styles/variables.scss'"))
      config.module
        .rule('scss')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => mergeSassVariables(opt, "'@/styles/variables.scss';"))
    })
  },
}
