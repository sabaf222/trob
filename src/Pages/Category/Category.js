import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import './Category.css'
import { Link } from 'react-router-dom'
import ProductBox from '../../Components/ProductBox/ProductBox'
import Footer from '../../Components/Footer/Footer'
import { useParams } from 'react-router-dom'
import apiRequists from '../../Services/Axios/Configs/Configs'

export default function Category() {

    const { categoryName, shortName } = useParams()


    const [status, setStatus] = useState('all')

    const [products, setProducts] = useState([])

    const [shownProduct, setShownProduct] = useState([])

    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    useEffect(() => {
        console.log('body load');
        
        apiRequists.get(`/courses/category/${categoryName}`)
            .then(res =>  { 
                console.log(res.data);
                
                setProducts(res.data)
                setShownProduct(res.data)

            }
        )
    
     
        
            
    },[categoryName])

 useEffect(()=>{
    switch (status) {
        case 'all': {

            setShownProduct([...products])
        }
            break;

        case 'favereve': {
            let filterProduct = [...products].filter(product => product.courseAverageScore == '5')
            setShownProduct(filterProduct)
        }
            break;


        case 'seen': {

            setShownProduct([...products])
        }

            break;
        case 'expensive': {
            let filterProduct = [...products].sort((a, b) => b.price - a.price)
            setShownProduct(filterProduct)
        }
            break;
        case 'cheep': {
            let filterProduct = [...products].sort((a, b) => b.price - a.price)

            setShownProduct(filterProduct.reverse())
        }
            break;
        
        default:{

            setShownProduct([...products])
        }
             break;


    }
 },[status])
    
   

    const filterPrice = () => {

        const min = parseFloat(minPrice)
        const max = parseFloat(maxPrice)
        if (!isNaN(min) && (!isNaN(max))) {
            const filteredPrice = [...products].filter(product => {

                return product.price >= min && product.price <= max

            })


            setShownProduct(filteredPrice)
        } else {
            setShownProduct([])
        }


    }

    const existProduct = () => {
        console.log('exist');
        const filteredproduct = [...products].filter(product => product.count !== 0)
        setShownProduct(filteredproduct)

    }
    const onlineBuy = () => {
        const filteredProduct = [...products].filter(product => product.sell === 'online')
        setShownProduct(filteredProduct)
    }
    const inPersonBuy = () => {
        const filteredProduct = [...products].filter(product => product.sell === 'inPerson')

      return  setShownProduct(filteredProduct)
    }
    return (
        <>
            <Header  />
            <div className="main">
                <div className="category-filter">
                    <div className="category-filter__right">
                        <p className="category-filter__title">قیمت</p>
                        <div class="category-filter__price">
                            <div class="category-filter__priceItem">
                                <label for="">
                                    <span>از</span>
                                    <input type="text" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} name="min_price" placeholder="0" />
                                </label>
                                <span>تومان</span>
                            </div>
                            <div class="category-filter__priceItem">
                                <label for="">
                                    <span>تا</span>
                                    <input type="text" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} name="max_price" placeholder="0" />
                                </label>
                                <span>تومان</span>
                            </div>
                            <button onClick={filterPrice} >اعمال فیلتر قیمت</button>
                        </div>
                        <div class="category-filterChecked">
                            <label for="offlineStatus" className="item">
                                فقط موجود
                                <input id="offlineStatus" type="checkbox" name="offline" class="switch" onChange={existProduct} />

                            </label>

                            <label for="offlineStatus" className="item">
                                امکان خرید حضوری
                                <input id="offlineStatus" type="checkbox" name="offline" class="switch" onChange={inPersonBuy} />

                            </label>
                            <label for="onlineStatus" className="item">
                                امکان خرید آنلاین
                                <input id="onlineStatus" type="checkbox" name="online" class="switch" onChange={onlineBuy} />
                            </label>
                        </div>
                    </div>

                    
                    <div className="category-filter__left">

                        <div className="category-filter__container">

                            <div className="category-filter__breadcrumbs">
                                <Link to='/'>
                                    خانه

                                </Link>

                                <Link>
                                    {categoryName}

                                </Link>
                            </div>
                            <div className="catergory-filter__sort mb-5">
                                <ul>
                                    <li className={status === 'all' ? 'active' : ""} onClick={() => {

                                        setStatus('all')
                                    }}>
                                        <span  >
                                            همه ی محصولات
                                        </span>
                                    </li>
                                    <li className={status === 'seen' ? 'active' : ""} onClick={() => {
                                        setStatus('seen')
                                    }}>
                                        <span>
                                            پربازدیدترین
                                        </span>
                                    </li>
                                    <li className={status === 'expensive' ? 'active' : ""} onClick={() => {
                                        setStatus('expensive')

                                    }}>
                                        <span>
                                            گران ترین
                                        </span>
                                    </li>
                                    <li className={status === 'cheep' ? 'active' : ""} onClick={(event) => {
                                      
                                        setStatus('cheep')

                                    }}>
                                        <span>
                                            ارزان ترین
                                        </span>
                                    </li>
                                    <li className={status === 'favereve' ? 'active' : ""} onClick={() => {
                                        setStatus('favereve')

                                    }} >
                                        <span>
                                            محبوب ترین
                                        </span>
                                    </li>
                                  
                                </ul>
                            </div>

                            <div className="row">
                                {shownProduct.length !== 0 ? (
                                       
                                    shownProduct.map(product => (
                                        <div className="col-3 product-box my-2">

                                            <ProductBox key={product._id} {...product} />
                                        </div>

                                    ))
                                ) : (

                                    <div className='alert alert-danger text-center fs-5'>محصولی برای نمایش وجود ندارد</div>
                                )}



                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
