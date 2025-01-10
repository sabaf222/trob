import React from 'react'
import './VipBox.css'
import { Store } from '../Data/Data'


export default function VipBox({src,title,price,desc}) {
  
console.log(src);

  return (
    <div className="col-2">
   <div className="product-item">
   <div className="product-item__img">
    <img  src={src} alt="" />
   </div>
   <div className="product-item__title">{title}</div>
   <div class="product-item__price">{price} تومان</div>
   <div className="product-item__seller">
    از
    <span className='desc' >{" "}
    {desc}
    </span>{ " "}
    خرید کنید
   </div>

   </div>

    </div>
  )
}
