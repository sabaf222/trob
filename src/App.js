import React, { useCallback, useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import AuthContext from './AuthContext/AuthCountext'

export default function App() {
  let router = useRoutes(routes)
  const [isLogin, setIsLogin] = useState(false)
  const [userInfos, setUserInfos] = useState({})
  const [token, setToken] = useState(false)

  const login=(userInfos,token)=>{
    setIsLogin(true)
    setUserInfos(userInfos)
    setToken(token)
    localStorage.setItem('user',JSON.stringify({token}))

  }
  const logout=useCallback(()=>{
    setIsLogin(false)
  setUserInfos({})
  localStorage.removeItem('user')


  })


useEffect(()=>{
  const localStorageData=JSON.parse(localStorage.getItem('user'))
if(localStorageData){

  fetch(`http://localhost:4000/v1/auth/me`,{
    headers:{
      Authorization:`Bearer ${localStorageData.token}`
    }
  }).then(res=>res.json())
  .then(result=>{
 
    setUserInfos(result)
    setIsLogin(true)
    
  })

}else{
  setIsLogin(false)
}
  
},[login,logout])

  return (
    <AuthContext.Provider value={{
      isLogin,
      userInfos,
      token,
      login,
      logout,
    
    }}>

      {router}
    </AuthContext.Provider>


  )
}
