import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/home';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({recommendedProducts}: HomeProps) {
  return (
    <div>
      <SEO title="DevCommerce, your best e-commerce!" shouldExcludeTitleSuffix/>

      <section>
        <Title>Suavão?</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>
      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    } 
  }
}