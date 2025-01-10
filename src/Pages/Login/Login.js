import React, { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../AuthContext/AuthCountext';
import ReCAPTCHA from "react-google-recaptcha";


import './Login.css'

export default function Login() {

  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const [isRecaptcha,setIsRecaptcha]=useState(false)

  const loginUser = (data) => {

    fetch(`http://localhost:4000/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(data)
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then((result) => {
        swal({
          title: "با موفقیت لاگین شدید",
          icon: "success",
          buttons: "ورود به پنل",
        }).then((value) => {
          navigate("/");

        });
        authContext.login({}, result.accessToken);
      })
      .catch((err) => {
        console.log(err);

        swal({
          title: "همچین کاربری وجود ندارد",
          icon: "error",
          buttons: "تلاش دوباره",
        });
      });

  }
 const googleRecaptchaHAndler=()=>{
  setIsRecaptcha(true)
 }
  return (
    <div className="auth">
      <div className="auth__register">
        <div className="auth__register-top">
          <Link>
            <img src="/images/logo/torob_logo.svg" alt="" srcset="" />
          </Link>
          <h2>خوش آمدید</h2>
          <h1>اگر حساب کابری ندارید
            {" / "}
            <Link to='/register' className='auth__register-link'>
              ثبت نام کنید

            </Link>
          </h1>
          <form onSubmit={handleSubmit(loginUser)}>

            <input {...register('identifier', { required: true })} placeholder='نام کاربری را وارد کنید' />
            {errors.identifier && <p className='text-danger mb-1'>این فیلد اجباری است</p>}



            <input type='password' {...register('password', { required: true })} placeholder='رمز عبور را وارد کنید' />
            {errors.password && <p className='text-danger mb-1' >این فیلد اجباری است</p>}
            <ReCAPTCHA className='mb-2'
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={googleRecaptchaHAndler}
            />,
            <input type="submit" className='submit' value='ورود' disabled={!isRecaptcha} />
          </form>

        </div>



      </div>

    </div>
  )
}
