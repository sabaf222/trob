import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'

import swal from 'sweetalert'

import './Sidebar.css'
import AuthContext from "../../../AuthContext/AuthCountext";

export default function Sidebar() {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()






  const logoutAdmin = (event) => {
    event.preventDefault()
    swal({
      title: 'با موفقیت لاگ‌آوت شدین',
      icon: 'success',
      buttons: 'اوکی'
    }).then(() => {
      authContext.logout()
      navigate('/')
    })
  }

  return (
    <div id="sidebar" class="col-2">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <a href="#">
            <img src="/images/logo/torob_logo.svg" alt="Logo" />
          </a>
        </div>

        <div class="sidebar-menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li class="active-menu">
            <Link to="/p-admin">
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="products">
              <span>محصولات</span>
            </Link>
          </li>
          <li>
            <Link to="menus">
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="articles">
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="users">
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to="offs">
              <span>تخفیف ها</span>
            </Link>
          </li>
         
          <li>
            <Link to="category">
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="contacts">
              <span>پیغام ها</span>
            </Link>
          </li>
        
         
          <li>
            <Link to="discount">
              <span>
                تخفیف همگانی

              </span>
            </Link>
          </li>
          <li>
            <Link to="comments">
              <span>کامنت ها</span>
            </Link>
          </li>
          <li>
            <a href="#" onClick={logoutAdmin}>
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
