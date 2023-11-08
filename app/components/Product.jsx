'use client'

import { client, urlFor } from '@/lib/client'
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Product({ product: { image, name, slug, price } }) {
  const imageProps = useNextSanityImage(client, image[0]);

  return (
    <div>
      <Link href={`/products/${slug.current}`}>
        <div className="product-card">
          <Image
          // src=''
            // src={imageProps.src}
            src={urlFor(image[0]).url()}
            alt=""
            width={250}
            height={250}
            className='product-image'
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}
