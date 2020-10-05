import Head from 'next/head';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    shouldExcludeTitleSuffix?: boolean;
    shouldIndexPage?: boolean;
}

export default function SEO({
    title,
    description,
    image,
    shouldExcludeTitleSuffix = false,
    shouldIndexPage = true
}: SEOProps){
    const pageTitle = `${title} ${!shouldExcludeTitleSuffix ? '| DevCommerce' : ''}`;
    return (
        <Head>
            <title>{ pageTitle }</title>
        </Head>
    )
}