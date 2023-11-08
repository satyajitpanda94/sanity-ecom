"use client";

import Product from "@/app/components/Product";
import { client, urlFor } from "../../../lib/client";
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useStateContext } from "@/context/StateContext";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import SanityImage from "@/app/components/SanityImage";

export default function ProductsDetails({ params }) {
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState(null);
    const [index, setIndex] = useState(0)
    const { quantity, incQuantity, decQuantity, onAdd } = useStateContext()

    useEffect(() => {
        const getData = async (slug) => {
            const productQuery = `*[_type == "product" && slug.current=='${slug}'][0]`
            const productData = await client.fetch(productQuery, { next: { revalidate: 3600 } })

            setProductData(productData)

            const productsQuery = `*[_type == "product" && slug.current!='${slug}']`
            const products = await client.fetch(productsQuery, { next: { revalidate: 3600 } })

            setProducts(products)
        }
        getData(params.slug)
    }, [params.slug])

    return (
        <div>
            <div className="product-detail-container">
                {
                    productData != null && (
                        <>
                            <div>
                                <div className="image-container">
                                    <Image
                                        src={urlFor(productData?.image[index]).url()}
                                        // src={getImage(productData?.image[index]).src}
                                        // image={productData?.image[index]}
                                        alt=""
                                        width={720}
                                        height={720}
                                        // fill={true}
                                        priority={true}
                                        className="product-detail-image"
                                    />
                                </div>
                                <div className="small-images-container">
                                    {
                                        productData && productData?.image?.map((item, i) => (
                                            <Image
                                                src={urlFor(item).url()}
                                                width={450}
                                                height={450}
                                                className={
                                                    i === index ?
                                                        "small-image selected-image" :
                                                        "small-image"
                                                }
                                                alt="image"
                                                onMouseEnter={() => setIndex(i)}
                                                key={i}
                                                priority={true}
                                            />
                                            // <div
                                            //     // src={urlFor(item)}
                                            //     // src={getImg(item).src}
                                            //     // alt=''

                                            //     onMouseEnter={() => setIndex(i)}
                                            //     key={i}
                                            // >
                                            //     <SanityImage
                                            //         image={item}
                                            //         className={
                                            //             i === index ?
                                            //                 "small-image selected-image" :
                                            //                 "small-image"
                                            //         } />
                                            // </div>
                                        ))
                                    }
                                </div>

                            </div>
                            <div className="product-detail-desc">
                                <h1>{productData?.name}</h1>
                                <div className="reviews">
                                    <div>
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiOutlineStar />
                                    </div>
                                    <p>(20)</p>
                                </div>
                                <h4>Details: </h4>
                                <p>{productData?.details}</p>
                                <p className="price">${productData?.price}</p>
                                <div className="quantity">
                                    <h3>Quantity: </h3>
                                    <p className="quantity-desc">
                                        <span
                                            className="minus"
                                            onClick={decQuantity}
                                        >
                                            <AiOutlineMinus />
                                        </span>
                                        <span className="num">
                                            {quantity}
                                        </span>
                                        <span
                                            className="plus"
                                            onClick={incQuantity}
                                        >
                                            <AiOutlinePlus />
                                        </span>
                                    </p>
                                </div>
                                <div className="buttons">
                                    <button type="button" className="add-to-cart" onClick={() => onAdd(productData, quantity)}>Add to Cart</button>
                                    <button type="button" className="buy-now">Buy Now</button>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also Like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {
                            products.length !== 0 && products?.map(item => <Product product={item} key={item._id} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

