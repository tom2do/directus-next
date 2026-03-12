const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: (process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://directus.2do-dev25.de').replace('https://', ''),
                pathname: '/assets/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/directus-assets/:path*',
                destination: `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/:path*`,
            },
        ];
    },
};

export default nextConfig;