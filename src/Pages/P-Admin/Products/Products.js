import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/P-Admin/DataTable/DataTable'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import Modal from '../../../Components/Modal/Modal'
import './Products.css'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productCategory, setProductCategory] = useState('-1')

  const [productCover, setProductCover] = useState({})
  const [productStatus, setProductStatus] = useState('start')
  const [isShowModal,setIsShowModal]=useState(false)
  const [productInfo,setProductInfo]=useState({})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {

    const localStorageData = JSON.parse(localStorage.getItem("user"));

    getAllProducts()

    fetch(`http://localhost:4000/v1/category`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,

      }
    }).then(res => res.json())
      .then(allCategories => {
        console.log(allCategories);
        setCategories(allCategories)

      })

  }, [])
  const getAllProducts = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/courses`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,

      }
    }).then(res => res.json())
      .then(data => {


        setProducts(data)

      })
  }


  const createNewProduct = (data) => {

    const localStorageData = JSON.parse(localStorage.getItem("user"));

    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('shortName', data.shortName)
    formData.append('categoryID', productCategory)
    formData.append('price', data.price)
    formData.append('support', data.support)

    formData.append('status', productStatus)
    formData.append('cover', productCover)



    console.log(formData);

    if (productCategory == "-1") {
      swal({
        title: "لطفا دسته بندی محصول را انتخاب کنید",
        icon: "error"
      })
    } else {
      fetch(`http://localhost:4000/v1/courses`, {
        method: "POST",
        headers: {

          Authorization: `Bearer ${localStorageData.token}`,

        }, body: formData
      }).then(res => {
        if (res.ok) {
          swal({
            title: "محصول با موفقیت اضافه شد",
            icon: "success",
            buttons: "بسیار عالی"
          }).then(result => {
            getAllProducts()
          })
        }
      }

      )

    }
  }

  const removeProduct = (productID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    swal({
      title: "آیا از حذف محصول مطمئنی؟",
      icon: "warning",
      buttons: ["نه", "آره"]
    }).then(result => {
      if (result) {
        fetch(`http://localhost:4000/v1/courses/${productID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,

          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: "محصول با موفقیت حذف شد",
              icon: "warning",
              buttons: "بسیار عالی"
            }).then(result => {
              getAllProducts()
            })
          }
        })
      }

    })
  }

  // editProduct

  const editProduct = (shortName) => {
   

    const localStorageData = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:4000/v1/courses/${shortName}`, {
      headers: {

        Authorization: `Bearer ${localStorageData.token}`,
        "Content-Type": "application/json"
      }

    }).then(res => res.json())
      .then(data => {
        console.log(data);
        setProductInfo(data)

      })
  }

  return (
    <>
      <div class="home-content-edit" >
        <div class="back-btn">


          <div class="home-title">
            <span>افزودن محصول جدید</span>
          </div>
          <form class="form" onSubmit={handleSubmit(createNewProduct)}>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام محصول</label>
                <input

                  {...register("name", { required: true })}
                  type="text"
                  placeholder="لطفا نام محصول را وارد کنید..."
                />
                {errors.name && <span className=' error-message text-danger mt-1'>name is required</span>}


              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات محصول</label>
                <input

                  {...register("description", { required: true })}

                  type="text"
                  placeholder="لطفا توضیحات محصول را وارد کنید..."
                />
                {errors.description && <span className=' error-message text-danger mt-1'>name is description</span>}

              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">Url محصول</label>
                <input

                  {...register("shortName", { required: true })}

                  type="text"
                  isValid="false"

                  placeholder="لطفا Url محصول را وارد کنید..."
                />
                {errors.shortName && <span className=' error-message text-danger mt-1'>name is shortName</span>}

              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <input
                  {...register("price", { required: true })}

                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                {errors.price && <span className=' error-message text-danger mt-1'>name is price</span>}

              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">نحوه پشتیبانی دوره</label>
                <input
                  id="support"
                  {...register("support", { required: true })}

                  type="text"
                  isValid="false"
                  placeholder="لطفا نحوه پشتیبانی محصول را وارد کنید..."
                />
                {errors.support && <span className=' error-message text-danger mt-1'>name is support</span>}

              </div>
            </div>

            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی محصول</label>
                <select onChange={(event) => setProductCategory(event.target.value)}>
                  <option value="-1">دسته بندی محصول را انتخاب کنید</option>
                  {
                    categories.map(category => (
                      <option key={category._id} value={category._id}>{category.title}</option>

                    ))
                  }

                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس محصول</label>
                <input type="file" id="file"
                  onChange={event => {
                    console.log(event.target.files[0]);
                    setProductCover(event.target.files[0])
                  }}
                />
              </div>
            </div>
            <div class="col-12 my-2">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title my-2">وضعیت محصول</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>موجود </span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={event => setProductStatus(event.target.value)}


                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>ناموجود</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onInput={event => setProductStatus(event.target.value)}



                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" />
                </div>
              </div>
            </div>
          </form>



        </div>
      </div>
      <Modal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
      <div class="home-content-edit" >
        <div class="back-btn">


          <div class="home-title">
            <span>ویرایش محصول</span>
          </div>
          <form class="form" onSubmit={handleSubmit(createNewProduct)}>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام محصول</label>
                <input
                  value={productInfo.name}
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="لطفا نام محصول را وارد کنید..."
                />
                {errors.name && <span className=' error-message text-danger mt-1'>name is required</span>}


              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات محصول</label>
                <input

                  {...register("description", { required: true })}

                  type="text"
                  placeholder="لطفا توضیحات محصول را وارد کنید..."
                />
                {errors.description && <span className=' error-message text-danger mt-1'> description is required</span>}

              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">Url محصول</label>
                <input

                  {...register("shortName", { required: true })}

                  type="text"
                  isValid="false"

                  placeholder="لطفا Url محصول را وارد کنید..."
                />
                {errors.shortName && <span className=' error-message text-danger mt-1'> shortName is required</span>}

              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <input
                  {...register("price", { required: true })}

                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                {errors.price && <span className=' error-message text-danger mt-1'> price is required</span>}

              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">نحوه پشتیبانی دوره</label>
                <input
                  id="support"
                  {...register("support", { required: true })}

                  type="text"
                  isValid="false"
                  placeholder="لطفا نحوه پشتیبانی محصول را وارد کنید..."
                />
                {errors.support && <span className=' error-message text-danger mt-1'> support is required</span>}

              </div>
            </div>

            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی محصول</label>
                <select onChange={(event) => setProductCategory(event.target.value)}>
                  <option value="-1">دسته بندی محصول را انتخاب کنید</option>
                  {
                    categories.map(category => (
                      <option key={category._id} value={category._id}>{category.title}</option>

                    ))
                  }

                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس محصول</label>
                <input type="file" id="file"
                  onChange={event => {
                    console.log(event.target.files[0]);
                    setProductCover(event.target.files[0])
                  }}
                />
              </div>
            </div>
            <div class="col-12 my-2">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title my-2">وضعیت محصول</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>موجود </span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={event => setProductStatus(event.target.value)}


                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>ناموجود</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onInput={event => setProductStatus(event.target.value)}



                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" />
                </div>
              </div>
            </div>
          </form>



        </div>
      </div>
      </Modal>
      
      <DataTable title="محصولات">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>

              <th>دسته بندی</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (

              <tr>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.count !== 0 ? "موجود" : "ناموجود"}</td>
                <td>{product.categoryID.title}</td>

                <td>
                  <button type="button" class="btn btn-primary edit-btn" onClick={() => {
                    setIsShowModal(true)
                    editProduct(product.shortName)
                  }

                  }>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeProduct(product._id)}


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
