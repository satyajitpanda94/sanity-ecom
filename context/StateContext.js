'use client';

import React, { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast';

const Context = createContext();

export function StateContext({ children }) {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(item => item._id === product._id)
        setTotalPrice(prevTotal => prevTotal + product.price * quantity)
        setTotalQuantities(prevQunt => prevQunt + quantity)

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map(cartItem => {
                if (cartItem._id === product._id)
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + quantity
                    }
                return cartItem
            })

            console.log('updatedCartItems', updatedCartItems)
            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }])
        }

        setQuantity(1)
        toast.success(`${quantity} ${product.name} added to cart`)
    }

    const removeItem = (id) => {
        const foundItem = cartItems.find(item => item._id === id)
        setCartItems(prevItems => {
            return prevItems.filter(item => item._id !== id)
        })
        setTotalPrice(prevPrice => prevPrice - foundItem.price * foundItem.quantity)
        setTotalQuantities(prevQunt => prevQunt - foundItem.quantity)
    }


    const incQuantityInCart = (id) => {
        const foundItem = cartItems.find(item => item._id === id)

        setCartItems(prevItems => {
            return prevItems.map(item => {
                if (item._id == id)
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                return item
            })
        })
        setTotalPrice(prevTotal => prevTotal + foundItem.price)
        setTotalQuantities(prevQunt => prevQunt + 1)
    }

    const decQuantityInCart = (id) => {
        const foundItem = cartItems.find(item => item._id === id)

        if (foundItem.quantity > 1) {
            setCartItems(prevItems => {
                return prevItems.map(item => {
                    if (item._id == id)
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    return item
                })
            })
            setTotalPrice(prevTotal => prevTotal - foundItem.price)
            setTotalQuantities(prevQunt => prevQunt - 1)
        }
    }

    const incQuantity = () => {
        setQuantity(pre => pre + 1)
    }

    const decQuantity = () => {
        setQuantity(pre => {
            if (quantity <= 1)
                return 1
            return pre - 1
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                quantity,
                incQuantity,
                decQuantity,
                onAdd,
                incQuantityInCart,
                decQuantityInCart,
                removeItem
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)
