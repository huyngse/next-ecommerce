import { Product } from '@/components';
import { useStateContext } from '@/context/StateContext';
import { client, urlFor } from '@/lib/client';
import { ProductType } from '@/types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';

const ProductDetails = ({ product, products }:
    {
        product: ProductType,
        products: ProductType[]
    }) => {
    const { image, name, detail, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd } = useStateContext();
    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div >
                        <img src={urlFor(image[index])} alt="" className='product-detail-image' />
                    </div>
                    <div className='small-images-container'>
                        {
                            image.map((item: SanityImageSource, i: number) => (
                                <img
                                    src={urlFor(item)}
                                    alt="product-image" key={i}
                                    onMouseEnter={() => { setIndex(i) }}
                                    className={i === index
                                        ? 'small-image selected-image'
                                        : 'small-image'}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details: </h4>
                    <p>{detail}</p>
                    <p className='price'>${price}</p>
                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className='num'>
                                {qty}
                            </span>
                            <span className='plus' onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button
                            type='button'
                            className='add-to-cart'
                            onClick={() => { onAdd(product, qty) }}
                        >
                            Add to Cart
                        </button>
                        <button
                            type='button'
                            className='buy-now'
                            onClick={() => { }}
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {
                            products.map((product: ProductType) => (
                                <Product product={product} key={product._id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
    const products = await client.fetch(query);
    const paths = products.map((product: ProductType) => ({
        params: {
            slug: product.slug.current
        }
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}
export const getStaticProps = async ({ params: { slug } }: any) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`;
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
    return {
        props: {
            products,
            product
        }
    }
};