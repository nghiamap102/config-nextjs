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
        domains: ['dummyjson.com', 'via.placeholder.com', 'res.cloudinary.com', 'https://nghia-hoang.imgbb.com/'],
    },
    env: {
        API_URL: process.env.API_URL,
        GG_API_KEY: process.env.GG_API_KEY,
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        NO_IMAGE: process.env.NO_IMAGE,
    },
    // experimental: {
    //     outputStandalone: true,
    //   },
    // pageExtensions: ['tsx ,ts,md,mdx'],
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
    ) => {
        // Important: return the modified config
        if (!dev) {
            // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
            config.resolve.alias['@formatjs/icu-messageformat-parser'] =
                '@formatjs/icu-messageformat-parser/no-parser'
        }
        return config
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static',
    },
    poweredByHeader: false,
}

module.exports = nextConfig
