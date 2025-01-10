import DataTable from "../../../Components/P-Admin/DataTable/DataTable";
import React, { useEffect, useState } from 'react'
import swal from "sweetalert";
import { useForm } from "react-hook-form";


export default function Category() {

    const [categories, setCategory] = useState([])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getAllCategories()
    }, [])
    const getAllCategories = () => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        fetch(`http://localhost:4000/v1/category`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`,

            }
        }).then(res => res.json())
            .then(allCategory => {
                console.log(allCategory);
                setCategory(allCategory)

            })

    }


    const removeCategory = (categoryID) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        swal({
            title: "آیا از حذف اطمینان داری؟",
            icon: "",
            buttons: ["نه", "آره"]
        }).then(result => {
            if (result) {
                fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorageData.token}`,

                    }
                }).then(res => {
                    if (res.ok) {
                        swal({
                            title: "دسته بندی موردنظر باموفقیت حذف شد",
                            icon: "success",
                            buttons: "اوکی"
                        }).then(() => {
                            getAllCategories()
                        })
                    }
                })
            }
        })
    }

    // update category
    const updateCategory = (categoryID) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        swal({
            title: "عنوان دسته بندی جدید را وارد کنید",
            content: "input",
            buttons: "ثبت دسته بندی جدید"
        }).then(result => {
            if (result.trim().length) {
                fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorageData.token}`,


                    }, body: JSON.stringify({
                        title: result
                    })
                }).then(res => res.json())
                    .then(result => {
                        swal({
                            title: "دسته بندی جدید با موفقیت ثبت شد",
                            icon: "success",
                            buttons: "اوکی"
                        }).then(() => {
                            getAllCategories()
                        })
                    })
            }
        })

    }


    const createNewCategory=data=>{
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        fetch(`http://localhost:4000/v1/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`,

            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
                swal({
                    title: "دسته بندی جدید با موفقیت اضافه شد",
                    icon: "success",
                    buttons: "بسیار عالی"

                }).then(() => {
                    getAllCategories()
                })
            }
        })
    }
    return (
        <>
            <div class="home-content-edit">
                <div class="back-btn">

                    <h1>
                        افزودن دسته بندی جدید
                    </h1>
                </div>
                <form class="form">
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title">عنوان </label>
                            <input
                                type="text"
                                className=""
                                id="title"
                                {...register("title", { required: true })}

                                placeholder="لطفا عنوان دسته بندی را وارد کنید..."
                            />
                            {errors.title && <p className=' error-message text-danger mt-1'>title is required</p>}
                            
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="family input">
                            <label class="input-title">اسم کوتاه</label>
                            <input
                                type="text"
                                className=""
                                id="shortname"
                                {...register("name", { required: true })}



                                placeholder="لطفا اسم کوتاه را وارد کنید..."
                            />
                            
                            {errors.name && <p className=' error-message text-danger mt-1'>name is required</p>}

                        </div>
                    </div>


                    <div class="col-12">
                        <div class="bottom-form">
                            <div class="submit-btn">
                                <input type="submit" value="افزودن" onClick={handleSubmit(createNewCategory)} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <DataTable title="دسته بندی های">
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{category.title}</td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-primary edit-btn"
                                        onClick={() => updateCategory(category._id)}
                                    >
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-danger delete-btn"
                                        onClick={() => removeCategory(category._id)}

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
