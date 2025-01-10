import React, { useEffect, useRef, useState } from 'react'
import './Topbar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { IoBasketOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { useContext } from 'react';
import AuthContext from '../../AuthContext/AuthCountext';
import { useNavigate } from 'react-router-dom';


export default function Tobbar() {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState('')

  const [filteredProduct, setFilteredProduct] = useState([])
  const [products, setProducts] = useState([])
  const filterTitleRef = useRef()
  const [productBasketCount, setProductBasketCount] = useState('')









  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allData) => {
        console.log(allData);
        setProducts(allData)
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/users/courses`, {
          headers: {

            Authorization: `Bearer ${localStorageData.token}`
          }
        }).then(res => res.json()).then((data) => {
          console.log(data.length);

          setProductBasketCount(data.length)


        })




      });
  }, []);



  const searchInputHandler = (event) => {
    const value = event.target.value
    setSearchInput(value)
    filterData()
    filterTitleRef.current.className = 'd-block'
  }



  const filterData = () => {
    const filtered = products.filter(product => {
      return product.name.toLowerCase().includes(searchInput.toLowerCase().trim())

    })
    setFilteredProduct(filtered)
    console.log(filtered);


  }


  const goToGlobaleSearch = (value) => {
    console.log(value);

    setSearchInput(value)
    navigate(`/product-Info/${value}`)




  }



  return (


    <>
      <div className="col-12">
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <div className="navbar-right">

            <div className="navbar-brand">

              <Navbar.Brand href="#home"><img src="/images/logo/torob_logo.svg" className="navbar-logo" alt="" srcset="" /></Navbar.Brand>
              <span className='title'>ترب</span>

            </div>
            <form className='form' >
              <div className='search-input'>
                <IoIosSearch className='search-icon' />
                <input type="text" id="search1" value={searchInput}
                  onChange={searchInputHandler}
                  name="search" placeholder="نام کالا را وارد کنید" />
              </div>
              <ul className='product-list-filter'>
                <>

                  {filteredProduct.length === 0 ? (
                    <div className='noProduct d-none' ref={filterTitleRef}>محصولی یافت نشد</div>
                  ) : (

                    filteredProduct.map((product, index) => (



                      <>
                        <li className='' ref={filterTitleRef}>
                          <Link href="/category/سینمای-خانگی-و-ساندبار">
                            جستجو در دسته <span>{product.categoryID?.title}</span>
                          </Link>
                        </li>

                        <li className='product-item-filter' onClick={() => goToGlobaleSearch(product.shortName)}><Link>{index + 1} - {product.name} </Link></li>
                      </>
                    ))
                  )}
                </>
              </ul>
            </form>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href='/userbasket' >
                <div className='navbar-link'>

                  <IoBasketOutline className='basket-icon' />
                  <span >سبد خرید</span>
                  <div className='basket-count'>{productBasketCount}</div>
                </div>

              </Nav.Link>

            </Nav>
            <Nav>
              <Nav.Link >
                <div className='navbar-link'>

                  {authContext.isLogin ? (
                    <span >{authContext.userInfos.name}</span>
                  ) : (
                    <Link to="/register" >ورود / ثبت نام</Link>

                  )}

                </div>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>

        </Navbar>





      </div>
    </>
  )
}
