import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "./../../../Components/P-Admin/DataTable/DataTable";
import { useForm } from "react-hook-form";

export default function Offs() {
  const [products, setProducts] = useState([]);
  const [offs, setOffs] = useState([]);
  const [offProducts, setOffProduct] = useState("-1");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    getAllOffs();

    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allProducts) => setProducts(allProducts));
  }, []);

  function getAllOffs() {
    fetch(`http://localhost:4000/v1/offs`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
          }`,
      },
    })
      .then((res) => res.json())
      .then((allOffs) => {
        console.log(allOffs);
        
        setOffs(allOffs);
      });
  }



  const removeOff = (offID) => {
    swal({
      title: "آیا از حذف کد تخفیف اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/offs/${offID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
              }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کد تخفیف مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllOffs();
            });
          }
        });
      }
    });
  };


  const createNewOffs=data=>{
    const newOffInfos={
     code:data.code,
     percent:data.percent,
     max:data.max,
     course:offProducts
      
    }
    fetch(`http://localhost:4000/v1/offs`,{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("user")).token}`
      },body:JSON.stringify(newOffInfos)
    }).then(res=>{
        if(res.ok){
          swal({
            title:"کد تخفیف با موفقیت اضافه شد",
            icon:"success",
            buttons:"بسیار عالی"
          }).then(()=>{
            getAllOffs()
          })
        }
    })
  
    
  }

  return (
    <>
      <div className="home-content-edit">
        <div className="back-btn">

          <div class="container-fluid" id="home-content">
            <div class="container">
              <div class="home-title">
                <span>افزودن جلسه جدید</span>
              </div>
              <form class="form">
                <div class="col-6">
                  <div class="price input">
                    <label class="input-title">کد تخفیف</label>
                    <input
                      element="input"

                      placeholder="لطفا کد تخفیف را وارد نمایید"
                      {...register("code", { required: true })}
                    />
                    {errors.code && <p className='text-danger mb-1'>code is required</p>}

                  </div>
                </div>

                <div class="col-6">
                  <div class="price input">
                    <label class="input-title">درصد تخفیف</label>
                    <input
                      element="input"

                      placeholder="لطفا درصد تخفیف را وارد نمایید"
                      {...register("percent", { required: true })}

                    />
                    {errors.percent && <p className='text-danger mb-1'>percent is required</p>}
                    
                  </div>
                </div>

                <div class="col-6">
                  <div class="name input">
                    <label class="input-title">حداکثر استفاده</label>
                    <input
                      element="input"
                      type="text"
                      id="max"
                      placeholder="حداکثر استفاده از کد تخفیف"
                      {...register("max", { required: true })}

                    />
                    {errors.max && <p className='text-danger mb-1'>max is required</p>}
                    
                  </div>
                </div>

                <div class="col-6">
                  <div class="price input">
                    <label class="input-title" style={{ display: "block" }}>
                      دوره
                    </label>
                    <select
                      class="select"
                      onChange={(event) => setOffProduct(event.target.value)}
                    >
                      <option value="-1">محصول مدنظر را انتخاب کنید</option>
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
                <div class="col-12">
                  <div class="bottom-form">
                    <div class="submit-btn">
                      <input type="submit" value="افزودن "  onClick={handleSubmit(createNewOffs)}/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <DataTable title="کد های تخفیف">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کد</th>
              <th>درصد</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده</th>
              <th>سازنده</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {offs.map((off, index) => (
              <tr key={off._id}>
                <td>{index + 1}</td>
                <td>{off.code}</td>
                <td>{off.percent}</td>
                <td>{off.max}</td>
                <td>{off.uses}</td>
                <td>{off.creator}</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeOff(off._id)}
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
  );
}
