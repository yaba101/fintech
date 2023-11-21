/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.placeholderurl.com',
                port: '',
                pathname: '/',
            },
        ],
    },

}

module.exports = nextConfig
