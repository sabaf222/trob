import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import './Register.css'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import AuthContext from '../../AuthContext/AuthCountext'
import { useNavigate } from 'react-router-dom';
import apiRequists from '../../Services/Axios/Configs/Configs';
export default function Register() {
  const registerSchema = yup.object().shape(
    {
      name: yup.string("").required('این فیلد اجباری است').min(5,"نام حداقل 5 کارکتر باشد").max(12,"نام حداکثر 12 کارکتر باشد"),
      username: yup.string("").required('این فیلد اجباری است').min(5,"نام کاربری حداقل 5 کارکتر باشد").max(10,"نام کاربری حداکثر10 کارکتر باشد"),
      email: yup.string().nullable().email("تایپ ایمیل را به درستی واردکنید").required('این فیلد اجباری است'),
      phone: yup.string('').required("این فیلد اجباری است") .max(11,"شماره تلفن حاکثر 11 کارکتر باشد") ,
      password: yup.string('').required("فیلد پسورد اجباری است").min(8,"پسورد حداقل 8 کارکتر باشد").matches(/[a-z]+/).matches(/[A-Z]+/).matches(/\d*/).required("این فیلد اجباری است"),
      confirmPassword: yup.string().oneOf([yup.ref("password"),"پسورد و تکرار پسورد یکی نیست"]).required("این فیلد اجباری است")
  
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({resolver:yupResolver(registerSchema)});


const authContext=useContext(AuthContext)
const navigate=useNavigate()
 
  const registerNewUser = (data) => {
    
   
    
  fetch(`http://localhost:4000/v1/auth/register`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    }
    ,body:JSON.stringify(data)
      
  }).then(res=>{

    if(res.ok){
    
      return res.json()
    }
    else {
      if (res.status === 403) {
        swal({
          title: "این کاربر مسدود شده است",
          icon: "error",
          buttons: "ای بابا"
        })

      }
    }
  } ).then(data=>{
    console.log(data);
    authContext.login(data.user,data.accessToken)
    swal({
      title:"ثبت نام با موفقیت انجام شد",
      icon:"success",
      buttons:"ورود به پنل"
    }).then(()=>{

      navigate('/')
    })
    
  })

  }
  return (

    <div className="auth">
      <div className="auth__register">
        <div className="auth__register-top">
          <Link>
            <img src="/images/logo/torob_logo.svg" alt="" srcset="" />
          </Link>
          <h2>خوش آمدید</h2>
          <h1>اگر حساب کابری دارید
            {" / "}
            <Link to='/login' className='auth__register-link'>
              وارد شوید
            </Link>
          </h1>
          <form onSubmit={handleSubmit(registerNewUser)}>
            <input {...register('name',{ required: true })} placeholder='نام و نام خانوادگی' />
            {errors.name && <p className='text-danger mb-1'>{errors.name?.message}</p>}

            <input {...register('username',  { required: true }) } placeholder='نام کاربری را وارد کنید' />
            {errors.username && <p className='text-danger mb-1'> {errors.username?.message} </p>}

            <input {...register('email',{ required: true } )} placeholder='ایمیل را وارد کنید' />
            {errors.email && <p  className='text-danger mb-1' >{errors.email?.message}</p>}

            <input {...register('phone', { required: true  })} placeholder='شماره تلفن را وارد کنید ' />
            {errors.phone && <p  className='text-danger mb-1' >{errors.phone?.message}</p>}

            <input type='password' {...register('password', { required: true })} placeholder='رمز عبور را وارد کنید' />
            {errors.password && <p   className='text-danger mb-1' >{errors.password?.message}</p>}

            <input  type='password' {...register('confirmPassword', { required: true })} placeholder='رمز عبور را تکرار کنید' />
            {errors.confirmPassword && <p  className='text-danger mb-1' >{errors.confirmPassword?.message}</p>}
            <input type="submit" className='submit' value='ثبت نام' />
          </form>
       
        </div>


       
      </div>

    </div>
  )
}
