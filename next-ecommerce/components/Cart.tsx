import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/lib/client';
import { CartItemType } from '@/types';
import Link from 'next/link';
import React, { useRef } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from "react-icons/ti";
const Cart = () => {
  const cartRef = useRef<any>();
  const { totalPrice, totalQuantity, cartItems, setShowCart, decQty, incQty, qty } = useStateContext();
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => { setShowCart(false) }}
        >
          <AiOutlineLeft />
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>{totalQuantity} items</span>
        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type='button'
                onClick={() => { setShowCart(false) }}
                className='btn'
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {cartItems.length > 0 && cartItems.map((item: CartItemType) => (
            <div className='product' key={item.product._id}>
              <img
                src={urlFor(item.product.image[0])}
                alt="cart-item-image"
                className='cart-product-image'
              />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.product.name}</h5>
                  <h4>${item.product.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' >
                        <AiOutlineMinus />
                      </span>
                      <span className='num'>
                        0
                      </span>
                      <span className='plus' >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button
                    type='button'
                    className='remove-item'
                    onClick={() => { }}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button
                type='button'
                className='btn'
                onClick={() => { }}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart