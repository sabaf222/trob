import React from 'react'
import Header from '../../Components/Header/Header'
import './Blogs.css'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
export default function Blogs() {
    return (
        <>
            <Header />
            <div className="main">
                <div className="title my-4">بلاگ ها</div>
                <div className="all-blogs">
                    <div className="blog-items">
                        <Link to='/blog-info' className="blog-item">
                            <figure>
                                <img src="/images/blogs/1.webp" alt="" srcset="" />
                            </figure>
                            <div class="blog-item-over">
                                <h3>طرح ویژه مایکروسافت برای شکست‌دادن مک‌بوک ایر M3 لو رفت</h3>
                            </div>

                        </Link>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
