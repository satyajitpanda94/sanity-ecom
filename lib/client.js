import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'

export const client = createClient
    ({
        projectId: '5vzq730s',
        dataset: "production",
        apiVersion: "2023-10-27",
        useCdn: true,
        // token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
        // ignoreBrowserTokenWarning: true,
    })

const builder = imageUrlBuilder(client);
export const urlFor = (source) => {
    return builder.image(source);
}