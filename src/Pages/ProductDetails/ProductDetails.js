import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { Link } from 'react-router-dom'
import { IoShareSocialOutline } from "react-icons/io5";
import { FiArrowDownLeft } from "react-icons/fi";
import ProgressBar from 'react-bootstrap/ProgressBar';
import ProductBox from '../../Components/ProductBox/ProductBox';
import SellerBox from '../../Components/SellerBox/SellerBox';
import { useParams } from 'react-router-dom';
import Modal from '../../Components/Modal/Modal'
import swal from 'sweetalert';
import apiRequists from '../../Services/Axios/Configs/Configs';


import './ProductDetails.css'

export default function ProductDetails() {
    const [productInfo, setProductInfo] = useState([])
    const { categoryName, shortName } = useParams()
    const [sellers, setSellers] = useState()
    const [isShowModal, setIsShowModal] = useState(false);
    const [realetdProducts, setRealetdProducts] = useState([])
    const [status, setStatus] = useState("sellers")
    const [body, setBody] = useState('')
    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const  price= productInfo.price -(Math.floor(productInfo.price * productInfo.discount/100))






    useEffect(() => {
        const abortController = new AbortController()

        apiRequists.get(`/courses/${shortName}`, {
            signal: abortController.signal
        }).then(res => {
            setProductInfo(res.data)
            setSellers(res.data.seller)
        }

        )


        apiRequists(`/courses/related/${shortName}`, {
            signal: abortController.signal

        }).then(res => {
            setRealetdProducts(res.data)

        })
        apiRequists.get(`/auth/me`, {
            signal: abortController.signal

        }).then(res => {
            setName(res.data.name)
            setemail(res.data.email)
            setphone(res.data.phone)

        }

        )

        return () => {
            abortController.abort()
        }
    })




    const createComment = () => {



        const commentInfos = {
            name,
            email,
            phone,
            body
        }





        apiRequists.post(`/contact`, { name, email, phone, body }).then(res => {
            console.log(res);

            if (res.status === 201) {
                swal({
                    title: "پیغام شما با موفقیت ارسال شد در صورت تایید پاسخ  آن به ایمیل شما ارسال میشود",
                    icon: "success",
                    buttons: "بسیار عالی"
                }).then(() => {

                })
            }

        })


    }

    return (
        <>
            <Header />
            <div className="main">
                <div className="product-details">
                    <div className="product-details__breadcrumb">
                        <Link >
                            خانه
                        </Link>
                        <Link>{shortName}</Link>
                    </div>

                    <div className="top-product">
                        <div className="top-product-details">
                            <div className="top-product-details__img">
                                <div className="top-product-details__img-items">
                                    <figure class="item">
                                        <img class="lazyload" lazy="loading"
                                            src={`http://localhost:4000/courses/covers/${productInfo.cover}`} alt="گلکسی A55" />
                                    </figure>
                                </div>
                                <figure className='show-image' onClick={() => setIsShowModal(true)}>
                                    <img src={`http://localhost:4000/courses/covers/${productInfo.cover}`} alt="" srcset="" />
                                </figure>
                                <Modal isShowModal={isShowModal} setIsShowModal={setIsShowModal}
                                >
                                    <div className="modal-img-container">
                                        <img src={`http://localhost:4000/courses/covers/${productInfo.cover}`}
                                            alt="" />
                                    </div>



                                </Modal>
                            </div>
                            <div class="top-product__description">
                                <h1>{productInfo.name}</h1>
                                <div class="top-product__description-detail">
                                    <div class="top-product__description-topDetail">
                                        <Link to="#sellers">
                                            <i>
                                                <FiArrowDownLeft />
                                            </i>

                                            <span class="countSeller1">{productInfo.sellerCount}</span> فروشنده دیگر
                                        </Link>
                                        <div class="options">
                                            <div class="option share">
                                                <i>
                                                    <IoShareSocialOutline className='icon' />

                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='cheapShow'>

                                        <Link to="#" className={`${productInfo.seller ? "cheapest fill" : "cheapest empty"}`} rel="nofollow noopener noreferrer">
                                            <div class="right">
                                                <div class="name ">{productInfo.seller ? (` خرید از ${productInfo.seller}  `) : ("بدون فروشنده")}</div>
                                                <div className="price">
                                                {productInfo.discount ? (<span >تومان {price.toLocaleString()}</span>):productInfo.price}
                                                
                                                {productInfo.discount && (<span className='off'>
                                                {productInfo.seller ? (` تومان ${productInfo.price.toLocaleString()}`) : 'فروشنده ای یافت نشد'}
                                                    
                                                </span>)}
                                                
                                                                
                                                </div>
                                            </div>
                                            <div className="left">

                                                <span>{productInfo.seller ? "موجود" : "ناموجود"}</span>
                                            </div>
                                        </Link></div>
                                </div>
                                <div class="shortCode">
                                    <span>لینک کوتاه :</span>
                                    <Link to="#" class="code">https://torob2.rayganapp.ir/product/440821</Link>
                                </div>
                            </div>
                        </div>
                        <div className="top-product__chengeList">
                            <h2>لیست تغییرات قیمت</h2>
                            <div id="changePrice" style={{ display: 'block', boxSizing: ' border-box', height: '193px', width: '387px' }}>

                                <div className="top-product__changePrice">
                                    <div className="maxPrice ">
                                        <p>بیشترین قیمت</p>
                                        <span></span>
                                    </div>
                                    <div className="minPrice">
                                        <p>کمترین قیمت</p>
                                        <span></span>

                                    </div>

                                </div>
                            </div>
                            <div class="top-product__chengeList-prices">
                                <div class="item">
                                    <div class="name">بیشترین قیمت</div>
                                    <div class="price"> تومان {productInfo.price?.toLocaleString()}</div>
                                </div>
                                <div class="item">
                                    <div class="name">کمترین قیمت</div>
                                    <div class="price">تومان {productInfo.price?.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bot-product">
                        <div className="">

                            <div className="container-tabs" >
                                <div className={status === "sellers" ? "tab tabActive" : "tab"} onClick={() => {
                                    setStatus("sellers")
                                }}>
                                    فروشنده ها
                                    <span>{productInfo.sellerCount}</span>
                                </div>
                                <div className={status === "desc" ? "tab tabActive" : "tab"} onClick={() => {
                                    setStatus("desc")
                                }}>
                                    توضیحات

                                </div>
                                <div className={status === "videos" ? "tab tabActive" : "tab"} onClick={() => {
                                    setStatus("videos")
                                }}>
                                    ویدئوها
                                    <span>0</span>
                                </div>
                                <div className={status === "picture" ? "tab tabActive" : "tab"} onClick={() => {
                                    setStatus("picture")
                                }}>
                                    گالری تصاویر
                                    <span>
                                        1
                                    </span>
                                </div>
                                <div className={status === "quistion" ? "tab tabActive" : "tab"} onClick={() => {
                                    setStatus("quistion")
                                }}>
                                    پرسش و پاسخ
                                    <span>0</span>
                                </div>

                            </div>
                            <div className="bot-product__seller">
                                {status === "sellers" && (
                                    <>

                                        <div className="seller-title">
                                            <div className="seller-name">
                                                <FiArrowDownLeft />
                                                فروشنده ها
                                            </div>
                                            <div className="seller-counts">


                                                <div className="seller-count online">
                                                    {productInfo.sell === 'online' ? ` فروش آنلاین ${productInfo.sellerCount ? productInfo.sellerCount : 0}` : 'فروش آنلاین 0'}
                                                </div>


                                                <div className="seller-count ">
                                                    {productInfo.sell === 'inPerson' ? ` فروش حضوری ${productInfo.sellerCount ? productInfo.sellerCount : 0}` : 'فروش حضوری 0'}


                                                </div>
                                            </div>
                                        </div>

                                        <div className="bot-product__filters">
                                            <div className="filters-sort">

                                                <div className="filters-title">
                                                    ترتیب بر اساس :
                                                </div>
                                                <ul>
                                                    <li>
                                                        <span>
                                                            محبوب ترین
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            گران ترین
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            ارزان ترین
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="filters-prices">
                                                <div className="price-item">
                                                    <div className="price-name">
                                                        خرید آنلاین
                                                    </div>
                                                    <div className="price">
                                                        0
                                                    </div>
                                                </div>
                                                <div className="price-item">
                                                    <div className="price-name">
                                                        خرید حضوری

                                                    </div>
                                                    <div className="price">
                                                        0
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="bot-product-seller">



                                            <Link>
                                                خرید آنلاین
                                            </Link>
                                            <ProgressBar animated now={30} className='progressBar' />
                                            {productInfo.sell === 'online' && productInfo.seller && (

                                                <SellerBox
                                                    {...productInfo}

                                                />


                                            )}

                                        </div>
                                        <div className="bot-product-seller">


                                            <Link>
                                                خرید حضوری
                                            </Link>
                                            <ProgressBar animated now={20} className='progressBar' variant="danger" />
                                            {productInfo.sell === 'inPerson' && productInfo.seller && (
                                                <SellerBox

                                                    {...productInfo}
                                                />


                                            )}


                                        </div>
                                    </>
                                )}
                                {status === "desc" && (
                                    <div className="alert alert-danger"> برای محصول مورد نظر توضیحاتی وجود ندارد</div>
                                )}
                                {status === "videos" && (
                                    <div className="alert alert-danger"> برای محصول مورد نظر ویدئویی وجود ندارد</div>

                                )}

                                {status === "picture" && (
                                    <>
                                        <img src={`http://localhost:4000/courses/covers/${productInfo.cover}`} alt="" srcset="" />
                                    </>
                                )}

                                {status === "quistion" && (
                                    <div className='all-comment'>

                                        <div className="sendComment">
                                            <label htmlFor="body-Text">سوال*</label>
                                            <textarea value={body} onChange={event => setBody(event.target.value)} name="body" id="bodyText" placeholder="سوال را وارد کنید"></textarea>
                                            <button className='create-comment' onClick={createComment}>ارسال</button>
                                        </div>
                                        <div className="show-comment">


                                            <div class="emptyComment">پرسشی وجود ندارد</div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="bot-product-about-product">
                            <div className="about-product-tilte">
                                مشخصات محصول
                            </div>
                            <div className="about-product-details">
                                <div className="about-product-detail">
                                    <div class="title-detail">مشخصات کلیدی</div>
                                    <ul>
                                        <li>
                                            <div className='name'>نوع پردازنده - cpu</div>

                                            <div className="body">چهار هسته‌ 2.7 گیگاهرتز Cortex-A78 و چهار هسته‌ 2.0 گیگاهرتز Cortex-A55</div>

                                        </li>
                                        <li>
                                            <div class="name">تعداد سیم کارت</div>
                                            <div class="body">دو سیم‌ کارت نانو سیم (هیبریدی، همزمان فعال)</div>
                                        </li>
                                    </ul>

                                </div>
                                <div className="about-product-detail  detail2">
                                    <div className="title-detail">
                                        مشخصات کلی
                                    </div>
                                    <ul>
                                        <li >
                                            <div className='name'>نوع پردازنده - CPU :</div>
                                            <div className="body">دو سیم‌ کارت نانو سیم (هیبریدی، همزمان فعال)</div>
                                        </li>
                                        <li >
                                            <div className='name'>نوع پردازنده - CPU :</div>
                                            <div className="body">دو سیم‌ کارت نانو سیم (هیبریدی، همزمان فعال)</div>
                                        </li>
                                    </ul>
                                </div>


                            </div>

                        </div>

                    </div>
                    <div className="realted-product">
                        <div className="realted-product-title">
                            محصولات مرتبط
                        </div>
                        <div className="row">
                            {realetdProducts.map(product => (
                                <div className="col-3 product-box" >
                                    <ProductBox key={product._id} {...product} />
                                </div>
                            ))}




                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

