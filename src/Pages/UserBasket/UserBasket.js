import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { BsBasket } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";
import './UsrBasket.css'
import { Link } from 'react-router-dom';
import BasketBox from '../../Components/BasketBox/BasketBox';
export default function UserBasket() {

    const [baskets, setBaskets] = useState([])
    
  
 
  
   

    useEffect(() => {
        getAllProductBasket()

    }, [])

    const getAllProductBasket = () => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/users/courses`, {
            headers: {

                Authorization: `Bearer ${localStorageData.token}`
            }
        }).then(res => res.json()).then((data) => {
            setBaskets(data)
            console.log(data);
            
           

        })

    }
    const removeProductUser = (productID) => {

        const filtered = [...baskets].filter(product => product._id !== productID)

        setBaskets(filtered)

    }
    const calculateTotal = () => {  
        
        
        return baskets.reduce((total, product) => {  
            return total + product.price * product.productCount;  
        }, 0);  
    }; 
    const calculateTotalDiscount = () => {  
        return baskets.reduce((total, product) => {  
            return total + product.price * product.course.discount/100;  
        }, 0);  
    }; 
    return (
        <>
            <Header />
            <div className="main">

                {baskets.length === 0 ? (

                    <div className="basket-wrapper">

                        <BsBasket className='basket' />
                        <div className="">سبد خرید شما خالی است</div>
                    </div>


                ) : (
                    <div className='basket-container'>
                        <div className="basket-top">

                            <div className="basket-right">
                                <div className="">

                                    <CgDanger className='icon' />
                                    <span>
                                        کالا پس از پرداخت برای شما رزرو خواهد شد. افزودن کالا به سبد به معنای رزرو قیمت یا تعداد نیست.
                                    </span>
                                </div>



                            </div>
                            <div className="basket-left">
                                <Link to='/' className='link'> بازگشت به فروشگاه</Link>

                            </div>
                        </div>
                        <div className="basket-bot">
                            <ul>
                                <li >

                                    {baskets.map(product => (

                                        console.log(product),

                                        <BasketBox key={product._id} {...product} removeProduct={removeProductUser} totalPrice={calculateTotal} totalDiscount={calculateTotalDiscount} />
                                    ))}
                                </li>
                            </ul>


                            <div className="basket-bot-left">


                                <div className='product-basket-price'>قیمت کالاها
                                    <span className=''>{calculateTotal().toLocaleString()}</span>

                                </div>
                                <div className='product-basket-discount'>تخفیف کالا ها
                                    <span>{calculateTotalDiscount().toLocaleString()}</span>
                                </div>
                                <div className="basket-total-price">
                                    جمع سبد خرید
                                    <span>{(calculateTotal()+ calculateTotalDiscount()).toLocaleString()}</span>
                                </div>

                                <button className='send-user-basket'>ثبت سفارش</button>

                            </div>
                        </div>




                    </div>
                )}
            </div>

        </>
    )
}
