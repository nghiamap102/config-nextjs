const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        customKey: 'abc',
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    experimental: {
        urlImports: ['https://example.com/modules/'],
    },
}

module.exports = nextConfig
