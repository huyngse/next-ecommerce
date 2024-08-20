import { useStateContext } from '@/context/StateContext'
import { runFireWorks } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs';

const success = () => {
  const { setCartItems, setTotalQuantity, setTotalPrice } = useStateContext();
  useEffect(() => {
    setCartItems([]);
    setTotalQuantity(0);
    setTotalPrice(0);
    localStorage.clear();
    runFireWorks();
  }, [])
  
  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className='email-msg'>Check your email inbox for the receipt!.</p>
        <p className='description'>
          If you have any questions, please email <a className='email' href="mailto:order@example.com">order@example.com</a>
        </p>
        <Link href={'/'}>
          <button type='button' className='w-[300px] btn'>Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default success