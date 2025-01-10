import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/P-Admin/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "react-hook-form";


export default function Users() {
  const [users, setUsers] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allUsers) => {
        console.log(allUsers);
        setUsers(allUsers);
      });
  }

  const removeUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/${userID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllUsers();
            });
          }
        });
      }
    });
  };


  const banUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از بن مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت بن شد",
              icon: "success",
              buttons: "اوکی",
            });
          }
        });
      }
    });
  };

 

  const changeRole = (roleID) => {
    swal({
      title: "لطفا نقش",
      content: "input",
      buttons: "ارسال"
    }).then(value => {
      if (value.length) {
        const reqBodyInfos = {
          role: value,
          id: roleID
        }
        fetch(`http://localhost:4000/v1/users/role`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBodyInfos)
        }).then(res => {
          console.log(res);
          if(res.ok){
            swal({
              title:"تغییر نقش با موفقیت انجام شد",
              icon:"success",
              buttons:"اوکی"
            }).then(()=>{
              getAllUsers()
            })
          }

          return res.json()
        }
        )
      }
    })
  }


   
  


    const createNewMenu=data=>{
    

      fetch(`http://localhost:4000/v1/auth/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          
        },body:JSON.stringify(data)
      }).then(res=>{
 
        if(res.ok){
          swal({
            title:"کاربر با موفقیت اضافه شد",
            icon:"success",
            buttons:"بسیار عالی"
          }).then(()=>{
            getAllUsers()
          })
        }
      
      }
      )
      
    
      
    }
  return (
    <>
      <div class="home-content-edit">
        <div class="back-btn">
          <i class="fas fa-arrow-right"></i>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">نام و نام خانوادگی</label>
              <input
                type="text"
                className=""
                id="name"
               
                {...register("name",{ required: true })}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
            {errors.name && <p className='text-danger mb-1'>name is required</p>}
              
            </div>
          </div>
          <div class="col-6">
            <div class="family input">
              <label class="input-title">نام کاربری</label>
              <input
                type="text"
                className=""
                id="username"
                {...register("username",{ required: true })}
               
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
            {errors.username && <p className='text-danger mb-1'>username is required</p>}
              
            </div>
          </div>
          <div class="col-6">
            <div class="email input">
              <label class="input-title">ایمیل</label>
              <input
                type="text"
                className=""
                id="email"
                {...register("email",{ required: true })}
               
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
            {errors.email && <p className='error-message text-danger '>email is required</p>}
              
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">رمز عبور</label>
              <input
                type="text"
                className=""
                id="password"
                element="input"
                {...register("password",{ required: true })}
              
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
            {errors.password && <p className='error-message text-danger '>password is required</p>}

              
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">تکرار رمز عبور</label>
              <input
                type="text"
                className=""
                id="confirmPassword"
                element="input"
                {...register("confirmPassword",{ required: true })}
              
                placeholder="لطفا رمز عبور کاربر را تکرار کنید..."
              />
            {errors.confirmPassword && <p className='error-message text-danger '>confirmPassword is required</p>}
              
            </div>
          </div>
          <div class="col-6">

            <div class="phone input">
              <label class="input-title">شماره تلفن</label>
              <input
                type="text"
                className=""
                id="phone"
                {...register("phone",{ required: true })}

                
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
            {errors.phone && <p className='error-message text-danger '>phone is required</p>}
              
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن"  onClick={handleSubmit(createNewMenu)} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="کاربران">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>تغییر نقش</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>

                <td>{user.email}</td>
                <td>{user.role === 'ADMIN' ? "مدیر" : "کاربر عادی"}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn" onClick={() => changeRole(user._id)}>
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeUser(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => banUser(user._id)}
                  >
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
