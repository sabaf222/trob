import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdStorefront } from "react-icons/md";

import Badge from 'react-bootstrap/Badge';
import './ProductBox.css'


export default function ProductBox(props) {
  
    const  price= props.price -(Math.floor(props.price * props.discount/100))
    
    
    






    return (
        <>

            <Link className='slider-item' to={`/product-info/${props.shortName}`}>

                <div className="slider-item__img">
                    <img src={`http://localhost:4000/courses/covers/${props.cover}`} alt="" srcset="" />
                </div>
                <div class="slider-item__title">{props.name}</div>
                <div className={"slider-item__option"}>
                    <AiOutlineDollarCircle className='slider-item__icon ' />

                    <span>

                        {props.discount ?price.toLocaleString() : ''}
                    </span>

                    <div className={props.discount ? "line" : ''}>

                        {props.price.toLocaleString()} تومان
                    </div>


                </div>

                <div class="slider-item__option">
                    <MdStorefront className='slider-item__icon' />
                    <button className='add-basket'>افزودن به سبد خرید</button>

                </div>


            </Link>
            {props.discount ? (
                <Badge pill bg="danger" className='badge'>
                    %{props.discount ? props.discount : ""}
                </Badge>

            ) : null}
        </>


    )
}
