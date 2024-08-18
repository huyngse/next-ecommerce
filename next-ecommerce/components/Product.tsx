import { urlFor } from '@/lib/client';
import { ProductType } from '@/types'
import Link from 'next/link';
import React from 'react'

const Product = ({ product }: { product: ProductType }) => {
  const { image, name, slug, price } = product;
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img
            src={urlFor(image[0]).url()}
            alt="product-image"
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

export default Product