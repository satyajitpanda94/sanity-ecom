'use client';

import { client } from '@/lib/client';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import React from 'react'

export default function SanityImage({ image, className }) {
    const imageProps = useNextSanityImage(client, image);

    return (
        <Image
            src={imageProps.src}
            alt=""
            width={720}
            height={720}
            priority={true}
            className={className}
        />
    )
}
