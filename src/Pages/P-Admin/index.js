import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../Components/P-Admin/Sidebar/Sidebar'
import Topbar from '../../Components/P-Admin/Topbar/Topbar'
import './index.css'

export default function index() {
  return (
    <>
      <div id="content">
        <Sidebar />

        <div id="home" class="col-10">
          <Topbar />

          <div class="container-fluid" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
