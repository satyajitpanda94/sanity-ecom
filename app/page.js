// "use client";

import Image from 'next/image'
import Link from 'next/link'
import HeroBanner from './components/HeroBanner'
import FooterBanner from './components/FooterBanner'
import { client } from '@/lib/client'
import Product from './components/Product';

export const getData = async () => {
  const productQuery = '*[_type == "product"]'
  const products = await client.fetch(productQuery)

  const bannerquery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerquery)

  return {
    products,
    bannerData
  }
}

export default async function Home() {
  const { products, bannerData } = await getData()

  return (
      <main>
        <HeroBanner heroBanner={bannerData && bannerData[0]} />
        <div className="products-heading">
          <h2>Best Selling Products</h2>
          <p>Speakers of many variations</p>
        </div>

        <div className='products-container'>{
          products?.map((product, index) => <Product product={product} key={index} />)
        }
        </div>
        <FooterBanner footerBanner={bannerData && bannerData[0]} />
      </main>
  )
}


