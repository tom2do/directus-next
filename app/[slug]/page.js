import client from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Navigation/Header';
import Footer from '@/app/components/Navigation/Footer';
import BlockItems from '@/app/components/BlockItems';
import PostItems from "@/app/components/blocks/Posts/PostItems";


export default async function Page({params}) {

    // Instead of using `/`, this code uses the slug to retrieve the page details
    const { slug } = await params;


    const postData = await client.request(
        readItems('posts', {
            filter: {
                slug: {
                    _eq: slug
                }
            },
            fields: ['*', 'post_image.*', 'author.first_name', 'author.last_name']
        })

    );

    const pageData = await client.request(
        readItems('pages', {
            filter: {
                permalink: {
                    _eq: `/${slug}`
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





    const navigationId = pageData[0]?.navigation || 'main-nav';
    const footerNavigationId = pageData[0]?.footer_navigation || 'footer_menu';

    const blocks = pageData[0]?.blocks || null;

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

    if(!pageData.length && !postData.length) {
        notFound();
    }

    return (
        <main>
            <Header
                navigation={navigationData}
            />

            <>
                {blocks ? <BlockItems blocks={blocks} /> : <PostItems data={postData[0]}/>}
            </>

            <Footer
                navigation={footerNavigationData}
            />

        </main>
    );
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    try {
        const globals = await client.request(
            readItems('globals', {
                fields: ['global_seo']
            })
        );

        const seoData = await client.request(
            readItems('pages', {
                filter: {
                    permalink: { _eq: `${slug}` }
                },
                fields: ['seo']
            })
        );

        if (!seoData?.length) {
            //notFound();
        }

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
        if (error.digest?.startsWith('NEXT_HTTP_ERROR')) {
            throw error;
        }
        console.error('Error fetching metadata:', error);
        return {
            title: 'Default Title',
            description: 'Default Description',
        };
    }
}


