import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/P-Admin/DataTable/DataTable';
 
import swal from 'sweetalert'
import { IoMdCheckmark } from "react-icons/io"

export default function Menus() {
const [menuParent,setMenuParent]=useState('-1')
const [title,setTitle]=useState('')
const [href,setHref]=useState('')




  const [menus, setMenus] = useState([])
  useEffect(() => {
    getAllMenus()
  }, [])
  const getAllMenus=()=>{


    fetch(`http://localhost:4000/v1/menus/all`).then(res => res.json())
      .then(allMenus => {
        console.log(allMenus);
        setMenus(allMenus)

      })

  }
  const removeMenu = (menuID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/menus/${menuID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "منوی مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllMenus();
            });
          }
        });
      }
    });
  };
  const createMenu=(event)=>{
    event.preventDefault()
    
    const localStorageData=JSON.parse(localStorage.getItem("user"))

    const newMenuInfos={
      title,
      href,
      parent:menuParent ==="-1" ? undefined :menuParent
   
    
    }
    fetch(`http://localhost:4000/v1/menus`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${localStorageData.token}`,
      "Content-Type":"application/json",

      }
      ,body:JSON.stringify(newMenuInfos)
    }).then(res=>{
      if(res.ok){
        swal({
          title:"منو با موفقیت اضافه شد",
          icon:"success",
          buttons:"بسیار عالی"
        }).then(()=>{
          getAllMenus()
        })
      }
    })
   
    
  }

  

  return (
    <>
      <div class="home-content-edit" id="home-content">
                <div class="back-btn">
                    <div class="home-title">
                        <span>افزودن منوی جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">عنوان</label>
                                <input value={title} onChange={event=>setTitle(event.target.value)} type="text" id="title" isValid="false" required
                                 
                                 />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">مقصد</label>
                                <input value={href} onChange={event=>setHref(event.target.value)} type="text" id="href" isValid="false" required
                               
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                       
                        <div class="col-12">
                            <div class="bottom-form">
                            <div class="col-6">
                            <div class="name input">
                                
                                <select class="select" id="parent-menus" onChange={(event)=>setMenuParent(event.target.value)}>
                                   <option value="-1">دوره پرنت را انتخاب نمایید</option>

                                   {menus.map(menu=>(
                                    !Boolean(menu.parent)&&(<option value={menu._id}>{menu.title}</option>)
                                   ))}
                                </select>
                                
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>

                                <div class="submit-btn">
                                    <input type="submit" id="create-menu-btn" value="افزودن" onClick={createMenu}/>
                                </div>
                            </div>
                        </div>
                    </form>
                   
                </div>
            </div>
      <DataTable title="منوها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>فرزند..</th>
              <th>ویرایش</th>
              <th>حذف</th>

            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{menu.title}</td>

                <td>{menu.href}</td>
                <td>{menu.parent ? menu.parent.title : (<IoMdCheckmark/>)}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeMenu(menu._id)}

                  >
                    حذف
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
