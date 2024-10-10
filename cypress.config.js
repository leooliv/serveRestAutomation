const { defineConfig } = require('cypress')
const API_URL = 'https://serverest.dev'
const FRONT_URL = 'https://front.serverest.dev/'

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.API_URL = API_URL
      config.env.FRONT_URL = FRONT_URL
      return config
    },
    defaultCommandTimeout: 25000,
  },
})
