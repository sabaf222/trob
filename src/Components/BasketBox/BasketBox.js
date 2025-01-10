import React, { useEffect, useState } from 'react'

import { FaPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export default function BasketBox(props  ) {
    const price = Math.floor((Number(props.price) * Number(props.course.discount)) / 100)

    const [productCount, setProductCount] = useState(props.productCount)


    const addProduct = () => {

        setProductCount(productCount + 1)
      


    }
    const minusProduct = () => {

        setProductCount(productCount - 1)


    }

    const deleteProduct=(productID)=>{


      props. removeProduct(productID)
        
        
       
    }








    return (
        <div className="basket-bot-right">


            <div className="basket-details">
                <div className="basket-details-top">
                    <img src={`http://localhost:4000/courses/covers/${props.course.cover}`} alt="" srcset="" />
                    <div className="basket-details-desc">
                        <div className="basket-details-title">{props.course.name}</div>
                        <span className=""> {props.course.description}</span>
                    </div>


                </div>
                <div className="basket-details-bot">
                    <div className="wrraper-icons">
                        <button onClick={()=>addProduct(props._id)}>
                            <FaPlus />
                        </button>
                        <span>{productCount}</span>
                        {productCount <=1 ? (
                            <button >

                                <FaRegTrashAlt onClick={()=>deleteProduct(props._id)} />
                            </button>
                        ) : (
                            <button >

                                <FaMinus onClick={minusProduct} />
                            </button>

                        )}

                    </div>
                    <div className="product-price-wrapper">
                        <div className="d-flex">

                            <span className={`product-price ${props.course.discount!==0 && props.price !== 0 && 'offs'}`} >
                                {props.price.toLocaleString() } تومان
                            </span>
                            {props.course.discount!==0 && props.price !== 0 &&
                                <p className='discount'>%{props.course.discount}</p>
                            }
                        </div>
                        {
                            props.course.discount!==0 && props.price !== 0 &&

                            <p>{price.toLocaleString() }</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
