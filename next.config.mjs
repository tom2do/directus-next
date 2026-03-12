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
};

export default nextConfig;