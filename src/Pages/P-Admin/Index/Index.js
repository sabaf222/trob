import React, { useEffect, useState } from 'react'
import PAdminItem from './PAdminItem'
import DataTable from '../../../Components/P-Admin/DataTable/DataTable'
import './Index.css'

export default function Index() {
    const [adminName,setAdminName]=useState('')
    const[infos,setInfos]=useState([])
    const [lastUsers,setLastUsers]=useState([])

    useEffect(()=>{
        const localStorageData=JSON.parse(localStorage.getItem("user"))
        fetch(`http://localhost:4000/v1/infos/p-admin`,{
            headers:{
                Authorization: `Bearer ${localStorageData.token}`,

            }
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            setAdminName(data.adminName)
            setInfos(data.infos)
            setLastUsers(data.lastUsers)
            
        })
    },[])
  return (
    <>
    <div class="home-content-edit" id="home-content">
        <div class="back-btn">
            <div class="home-content-title">
                <span class="welcome">خوش آمدید,<span class="name" id="admin-welcome-name">{adminName}</span></span>
            </div>
           



        </div>
    </div>

    <DataTable title="افرادی اخیرا خرید کرده اند">
        <table class="table">
            <thead>
                <tr>
                    <th>شناسه</th>
                    <th>نام ونام خانوادگی</th>
                    <th>ایمیل</th>
                    <th>تلفن</th>
                    <th>نام کاربری</th>
        
                </tr>
            </thead>
            <tbody>
            
                 {lastUsers.map((user,index)=>(
                    

                    <tr>
                    <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.username}</td>
                        

                    </tr>
                 ))}
           
             
            </tbody>
        </table>
    </DataTable>
</>
  )
}
