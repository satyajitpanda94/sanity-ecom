'use client';

import { useStateContext } from '@/context/StateContext'
import { client, urlFor } from '@/lib/client';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react'
import { AiOutlineDelete, AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from "react-icons/ti";

export default function Cart() {
  const cartRef = useRef()
  const { totalPrice, decQuantityInCart, incQuantityInCart, totalQuantities, cartItems, setShowCart, removeItem } = useStateContext()
  // const imageProps = useNextSanityImage(client, image);

  // const getImage = (image) => {
  //   return useNextSanityImage(client, image);
  // }

  // console.log(cartItems)
  // console.log(totalQuantities)
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {
          totalQuantities === 0 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty.</h3>
              <Link href='/'>
                <button
                  type='button'
                  onClick={() => setShowCart(false)}
                  className='btn'
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )
        }

        <div className="product-container">
          {
            totalQuantities > 0 && cartItems.map(item => (
              <div className="product" key={item._id}>
                <Image
                  src={urlFor(item?.image[0]).url()}
                  width={450}
                  height={450}
                  className='cart-product-image'
                  alt=""
                />
                <div className="item-desc">
                  <div className="flex top">
                    <Link href={`/products/${item.slug.current}`}>
                      <h5>{item.name}</h5>
                    </Link>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div className="quantity">
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => decQuantityInCart(item._id)}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() => incQuantityInCart(item._id)}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => removeItem(item._id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {
          totalQuantities > 0 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button type='button' className='btn'>
                  Pay with Stripe
                </button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
