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
        domains: [
            'dummyjson.com',
            'via.placeholder.com',
            'res.cloudinary.com',
            'https://nghia-hoang.imgbb.com/',
        ],
    },
    async headers() {
        return [
            {
                source: '/',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'my custom header value',
                    },
                    {
                        key: 'x-another-custom-header',
                        value: 'my other custom header value',
                    },
                ],
            },
        ]
    },
    env: {
        API_URL_BE: process.env.API_URL_BE,
        API_URL: process.env.API_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        MONGODB_URI: process.env.MONGODB_URI,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
        FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
        FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
        NO_IMAGE: process.env.NO_IMAGE,
        PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
        PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
    },
    // experimental: {
    //     outputStandalone: true,
    // },
    // pageExtensions: ['tsx ,ts,md,mdx'],
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
    ) => {
        // Important: return the modified config
        if (!dev) {
            // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
            // config.resolve.alias['@formatjs/icu-messageformat-parser'] =
            //     '@formatjs/icu-messageformat-parser/no-parser'
        }
        return config
    },
    // serverRuntimeConfig: {
    //     // Will only be available on the server side
    //     mySecret: 'secret',
    //     secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    // },
    // publicRuntimeConfig: {
    //     // Will be available on both server and client
    //     staticFolder: '/static',
    // },
    // poweredByHeader: false,
}

module.exports = nextConfig
