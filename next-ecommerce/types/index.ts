import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export type ProductType = {
    image: SanityImageSource[],
    name: string,
    slug: string,
    price: number,
    detail: string
}

export type BannerType = {
    image: SanityImageSource,
    buttonText: string,
    product: string,
    desc: string,
    smallText: string,
    midText: string,
    largeText1: string,
    largeText2: string,
    discount: string,
    saleTime: string,
}