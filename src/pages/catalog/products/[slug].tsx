import { useRouter } from 'next/router';
import { useState } from 'react';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';
import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/lib/prismic';

interface ProductProps {
    product: Document;
}

export default function Product({product}: ProductProps){
    const router = useRouter();

    if (router.isFallback){
        return <p>Carregando...</p>
    }

    return (
        <div>
            <h1> {PrismicDOM.RichText.asText(product.data.title)}</h1>

            <img src={product.data.thumbnail.url} width="600" alt=""/>
            <div dangerouslySetInnerHTML={{__html: PrismicDOM.RichText.asHtml(product.data.description)}}/>

            <p>Price: R${product.data.price}</p>
        </div>
    )
    
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
    const { slug } = context.params;

    const product = await client().getByUID('product', String(slug), {});

    return {
        props: {
            product,
        },
        revalidate: 5
    }
}