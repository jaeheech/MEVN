const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '..//dist',
  productionSourceMap: false //js.map파일을 생성하지 않는다.
})
