'use client'
import { client, urlFor } from '@/lib/client'
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HeroBanner({ heroBanner }) {
    const imageProps = useNextSanityImage(client, heroBanner.image);

    return (
        <div className='hero-banner-container'>
            <div>
                <p className='beats-solo'>
                    {heroBanner.smallText}
                </p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                <Image
                    // src={imageProps.src}
                    src={urlFor(heroBanner.image).url()}
                    width={450}
                    height={450}
                    priority={true}
                    alt=""
                    className='hero-banner-image'
                />
                <div>
                    <Link href={`/products/${heroBanner.product}`}>
                        <button type='button'>{heroBanner.buttonText}</button>
                    </Link>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>{heroBanner.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
