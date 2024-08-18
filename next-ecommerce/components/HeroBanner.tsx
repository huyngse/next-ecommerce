import { urlFor } from '@/lib/client'
import { BannerType } from '@/types'
import Link from 'next/link'
import React from 'react'

const HeroBanner = ({ heroBanner }: { heroBanner?: BannerType }) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner?.smallText}</p>
        <h3>
          {heroBanner?.midText}
        </h3>
        <h1>
          {heroBanner?.largeText1}
        </h1>
        <img src={heroBanner?.image ? urlFor(heroBanner?.image).url() : ""} alt="headphones" className='hero-banner-image' />
        <div>
          <Link href={`/product/${heroBanner?.product}`}>
            <button type='button'>{heroBanner?.midText}</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{heroBanner?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner