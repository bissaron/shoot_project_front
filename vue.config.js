const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  devServer: {
    port: 3000, // Set the port number
  },
  lintOnSave: false
})
