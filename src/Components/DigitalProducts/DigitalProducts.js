import React, { useEffect, useState } from 'react'


import ProductBox from '../ProductBox/ProductBox'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import './DigitalProduct.css'
import { getAllProducts } from '../../Services/Axios/Requests/Products';



export default function NewProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        
           getAllProducts().then(res=>setProducts(res.data)) 

    }, [])
    return (

        <div className='allProductsList'>
            <div className="title">محصولات دیجیتالی</div>
            <div className="row">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    className="mySwiper"
                >
                    {products.filter(product=>product.categoryID?.name=='دیجیتال').map((product) => (
                        <SwiperSlide key={product._id}>
                            <ProductBox {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>



        </div>



    )
}
