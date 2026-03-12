import client from '../lib/directus';
import {readItems} from '@directus/sdk';
import Header from './components/Navigation/Header';
import Footer from './components/Navigation/Footer';
import BlockItems from "@/app/components/BlockItems";


export default async function Home() {
    // Fetch homepage data from Directus

    const homepageData = await client.request(
        readItems('pages', {
            filter: {
                permalink: {
                    _eq: '/'
                }
            },
            fields: [
                "*",
                "blocks.*",
                "block_editor.*",
                "block_editor.blocks.*.*.*",
                "blocks.item.*.*.*",

            ]
        })
    );

    const navigationId = homepageData[0]?.navigation || 1;
    const footerNavigationId = homepageData[0]?.footer_navigation || 'footer-menu';


    const blocks = homepageData[0]?.blocks || [];

    const navigationData = await client.request(
        readItems('navigation', {
            filter: {
                id: {
                    _eq: navigationId
                }
            },
            fields: [
                "*.*.*.*",
            ]
        })
    );

    const footerNavigationData = await client.request(
        readItems('navigation', {
            filter: {
                id: {
                    _eq: footerNavigationId
                }
            },
            fields: [
                "*.*.*.*",
            ]
        })
    );

    console.log(navigationData)


    return (
        <main>
            <Header
                navigation={navigationData}
            />

            <BlockItems blocks={blocks} />


            <Footer
                navigation={footerNavigationData}
            />

        </main>
    );
}


export async function generateMetadata() {
    try {
        const globals = await client.request(
            readItems('globals', {
                fields: ['global_seo']
            })
        );

        const seoData = await client.request(
            readItems('pages', {
                filter: {
                    permalink: {_eq: '/'}
                },
                fields: ['seo']
            })
        );

        const pageSeo = seoData?.[0]?.seo;
        const globalSeo = globals?.global_seo;

        return {
            title: pageSeo?.title || globalSeo?.title || 'Default Title',
            description: pageSeo?.meta_description || pageSeo?.description || globalSeo?.meta_description || 'Default Description',
            openGraph: {
                title: pageSeo?.title || globalSeo?.title,
                description: pageSeo?.meta_description || pageSeo?.description || globalSeo?.meta_description,
                images: [pageSeo?.og_image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${pageSeo?.og_image}` : null]
            }
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return {
            title: 'Default Title',
            description: 'Default Description',
        };
    }
}

