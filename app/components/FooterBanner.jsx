'use client'
import { client, urlFor } from '@/lib/client'
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function FooterBanner({ footerBanner: { discount,
  largeText1, largeText2, saleTime, smallText, midText, product,
  buttonText, image, desc } }) {

  const imageProps = useNextSanityImage(client, image);

  return (
    <div className='footer-banner-container'>
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/products/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        <Image
          src={urlFor(image).url()}
          alt=""
          width={450}
          height={450}
          style={{ objectFit: "contain" }}
          className='footer-banner-image'
        />
      </div>
    </div>
  )
}
