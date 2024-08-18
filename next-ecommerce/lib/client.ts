import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2024-08-18',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SSANITY_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource): string => builder.image(source).url();