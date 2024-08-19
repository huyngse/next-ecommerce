import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { SanityAsset } from "@sanity/image-url/lib/types/types";

export type ProductType = SanityAsset & {
    image: SanityImageSource[],
    name: string,
    slug: any,
    price: number,
    detail: string
}

export type BannerType = SanityAsset & {
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

export type CartItemType = {
    product: ProductType,
    quantity: number
}