import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    const [isShowsub, setIsShowSub] = useState(false)
    const [menus, setMenus] = useState([])
    const [subMenu, setSubMenu] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/v1/menus`).then(res => res.json()).then(data => {


            setMenus(data)


        })
    }, [])

    return (
        <nav className='nav'>
            <ul className='nav-list'>

               
                <ul className="main-header__menu">
                   

                    {menus.map((menu, index) => (
                       
                        <li className="main-header__item" key={index}>
                            <Link to={`/category/${menu.href}`} className="main-header__link">
                                {menu.title}
                                {menu.submenus.length !== 0 && (
                                    <>
                                        
                                        <ul className="main-header__dropdown">
                                            {menu.submenus.map((submenu) => (
                                                <li className="main-header__dropdown-item">
                                                    <Link
                                                        to={menu.href}
                                                        className="main-header__dropdown-link"
                                                    >
                                                        {submenu.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </Link>
                        </li>
                    ))}

                    {/* <li className="main-header__item">
                <a href="#" className="main-header__link">
                  فرانت اند
                  
                </a>
              </li> */}
                </ul>





            </ul>
        </nav>
    )
}
