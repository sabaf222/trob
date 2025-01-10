import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-item">
              
                    <ul>
                        <li><Link to="/special-offers/">تخفیف‌ها</Link></li>
                        <li><Link to="/search">همه محصولات</Link></li>
                        <li><Link to="/profile">پنل فروشگاه‌ها</Link></li>
                    </ul>
                    <ul>
                            <li><Link to="/page/test">عنوان</Link></li>
                            <li><Link to="/page/ارتباط-با-ما">ارتباط با ما</Link></li>
                            <li><Link to="/page/درباره-ما">درباره ما</Link></li>
                    </ul>
              
            </div>
        </div>
    )
}
