import React from 'react'
import { Link } from 'react-router-dom'
import './IndexBox.css'

export default function IndexBox() {
  return (
    <div className="col-3">
        <div className="index-item">
            <Link>
                <img src="/images/index/lux.webp" alt="" />
            </Link>
        </div>
    </div>
  )
}
