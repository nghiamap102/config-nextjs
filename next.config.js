/**
 * @type {import('next').NextConfig}
 **/
const path = require('path')
const { i18n } = require('./next-i18next.config')

const nextConfig = {
    reactStrictMode: true,
    i18n,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        domains: ['dummyjson.com', 'via.placeholder.com', 'eton.vn'],
    },
    env: {
        API_URL: process.env.API_URL,
        NO_IMAGE: process.env.NO_IMAGE,
    },
    // experimental: {
    //     outputStandalone: true,
    //   },
    webpack(config, { dev, ...other }) {
        if (!dev) {
            // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
            config.resolve.alias['@formatjs/icu-messageformat-parser'] =
                '@formatjs/icu-messageformat-parser/no-parser'
        }
        return config
    },
}

module.exports = nextConfig
