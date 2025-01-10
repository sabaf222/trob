import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import VipBox from '../../Components/vipBox/VipBox'
import { Link } from 'react-router-dom'
import IndexBox from '../../Components/IndexBox/IndexBox'
import ProductBox from '../../Components/ProductBox/ProductBox'
import DigitalProducts from '../../Components/DigitalProducts/DigitalProducts'
import Footer from '../../Components/Footer/Footer'
import { Store } from '../../Components/Data/Data'



import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdStorefront } from "react-icons/md";



import './Index.css'
import NewProducts from '../../Components/NewProducts/NewProducts'
export default function Index() {
  const [stores, setStores] = useState(Store)



  return (
    <div>
      <Header />


      <div className="main">

        <div className="product-seller">
          <div className="productVip">
            <div className="title">آگهی های فروشگاه</div>
            {
              stores.map(store => (


                <VipBox {...store} />


              ))

            }


          </div>

        </div>

        <div className="allIndexData">
          <div className="indexData">
            <div className="indexItem">
              <Link>
                <img src="/images/mm.gif" alt="" srcset="" />

              </Link>

            </div>

          </div>
          <div className="row my-5">

            <IndexBox />
            <IndexBox />
            <IndexBox />
            <IndexBox />


          </div>

        </div>
        <NewProducts/>
      


        <div className="row  justify-content-around indexData my-5">
          <div className="col-5">
            <div className="indexItem">
              <Link>
                <img src="/images/index/zz1.webp" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-5">
            <div className="indexItem">
              <Link>
                <img src="/images/index/zz2.gif" alt="" />
              </Link>
            </div>
          </div>
        </div>
        <DigitalProducts />



      </div>
      <Footer />


    </div>
  )
}
