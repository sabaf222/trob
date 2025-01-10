import React from 'react'
import AuthContext from '../../AuthContext/AuthCountext'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

export default function PriveteAdminPanel({children}) {
    const authContext=useContext(AuthContext)
    const navigate=useNavigate()
  return (
   <>
    {authContext.userInfos.role==="ADMIN" ? children :navigate("/login")}
   </>
  )
}
