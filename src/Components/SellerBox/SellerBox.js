import React from 'react'
import { Link } from 'react-router-dom'
import { MdStars } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import './SellerBox.css'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';

export default function (props) {
  let navigate = useNavigate()
  const  price= props.price -(Math.floor(props.price * props.discount/100))

  const addToBasket = () => {
    const bodyData = {
      price: props.price,

    }
    const productID={
      course:props._id
    } 



    if (props.price !== 0) {
      const localStorageData = JSON.parse(localStorage.getItem("user"))
      swal({
        title: "در صورت داشتن کد تخفیف وارد کنید",
        content: "input",
        buttons: ["خرید بدون کد تخفیف", "خریدبا تخفیف"]

      })

        .then(code => {
          if (code === null) {

            fetch(`http://localhost:4000/v1/courses/${props._id}/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`

              },
              body: JSON.stringify(bodyData)


            }).then(res => {
              if (res.ok) {
                swal({
                  title: "کالا با موفقیت به سبد خرید اضافه شد",
                  icon: "success",
                  buttons: ["ادامه", "مشاهده سبد خرید"]


                }).then(result => {
                  if (result) {
                    navigate('/userbasket')

                  }
                })
              }
            })
          }
          else {
            console.log(code);
            fetch(`http://localhost:4000/v1/offs/${code}`, {
              method: "POST",
              headers: {
                "Content-type":"application/json",
                Authorization: `Beare ${localStorageData.token}`,

              },body:JSON.stringify(productID)
            })
            .then(res=>{
              if(res.status===404){
                swal({
                      title:"کد وارد شده معتبر نیست",
                      icon:"error",
                      buttons:"ای بابا"
                    })
              }else if(res.status===409){
                swal({
                      title:"کد وارد شده قبلا استفاده شده",
                      icon:"error",
                      buttons:"ای بابا"
                    })
              }else{
                return res.json()
              }
            }
            ).then(code=>{
              fetch(`http://localhost:4000/v1/courses/${props._id}/register`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorageData.token}`,
                  "Content-Type":"application/json"

                },body:JSON.stringify({
                  price:props.price - (props.price * code.percent /100)
                })
              }) .then(res=>{
                if(res.ok){
                  swal({
                    title:"خرید با موفقیت انجام شد",
                    icon:"success",
                  buttons:[ "ادامه", "مشاهده سبد خرید"]

                  }).then((result)=>{
                    if(result){

                      navigate("/userbasket")
                    }
                  })
                }
              })
            })

            
            
          }
        })



    }



  }
  return (
    <div className="seller">
      <div className="seller-right">

        <div className="seller-top">
          <Link className='name'>
            <MdStars className='icon' />
            {props.seller}
          </Link>
          <div class="alert">
            <FiAlertTriangle />

            گزارش
          </div>
          <div class="created">( آخرین تغییر قیمت فروشگاه: 9 ماه قبل )</div>
        </div>
        <Link target="_blank" class="bot" rel="nofollow noopener noreferrer">
          <div class="title2">{props.name}</div>
          <div class="option">ضمانت سلامت کالا</div>
        </Link>
      </div>
      <div className="seller-left">

        <div className={props.discount? "price line":"price"}>
        {props.price.toLocaleString()} تومان
        
        </div>
        {props.discount ?( <span className='price '> {price.toLocaleString()}</span>):""}
        <div className="addCard" onClick={addToBasket} >
          افزودن به سبد
        </div>
      </div>
    </div>

  )
}
