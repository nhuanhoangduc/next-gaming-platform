const path = require('path')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([], {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Resolve alias
        config.resolve.alias = {
            ...config.resolve.alias,
            '@webapp': path.resolve(__dirname, './src'),
        }

        return config
    },
})
