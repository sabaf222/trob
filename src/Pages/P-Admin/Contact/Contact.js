import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/P-Admin/DataTable/DataTable';
import swal from 'sweetalert';

export default function Contact() {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        getAllContacts()
     
    }, [])
    const showMessage = (body) => {

        console.log(body);
        swal({
            title: body,

            buttons: "اوکی"
        })

    

    }
    const getAllContacts=()=>{
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        fetch(`http://localhost:4000/v1/contact`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`,

            }
        }).then(res => res.json())
            .then(allcontacts => {
                console.log(allcontacts);

                setContacts(allcontacts)
            })

    }

    const answermessage = (email) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        swal({
            title: "متن پاسخ را وارد کنید",
            content:"input",
            buttons:"ارسال ایمیل"
        }).then(result=>{
            console.log(result);
            
            if(result.trim().length){
                fetch(`http://localhost:4000/v1/contact/answer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorageData.token}`,



                    },
                    body: JSON.stringify({
                        email: email,
                        answer: result
                    })
                })
                .then(res=>{
                    console.log(res);
                    if(res.ok){
                        swal({
                            title:"پیغام شما با موفقیت ارسال شد",
                            icon:"success",
                            buttons:"اوکی"
                        }).then(()=>{
                            getAllContacts()
                        })
                    }
                    
                })

            }
        })

    }

    const removeContact=(contactID)=>{
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        swal({
            title:"آیا از حذف پیغام اطمینان داری؟",
            icon:"warning",
            buttons:["آره","نه"]
        }).then(result=>{
            if(result){
                fetch(`http://localhost:4000/v1/contact/${contactID}`,{
                    method:"DELETE",
                    headers:{
                        Authorization: `Bearer ${localStorageData.token}`,

                    }
                }).then(res=>{
                    if(res.ok){
                        swal({
                            title:"پیغام با موفقیت حذف شد",
                            icon:"success",
                            buttons:"اوکی"
                        }).then(()=>{
                            getAllContacts()
                        })
                    }
                })
            }
        })
    }
    return (
        <>
            <DataTable title="پیغام ها">
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>نام و نام خانوادگی</th>
                            <th>ایمیل</th>
                            <th> تلفن</th>
                            <th>مشاهده </th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr>
                                <td  className={contact.answer ==1 ? "contact-answer" :"no-contact-answer"}>{index + 1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn"
                                        onClick={() => {
                                            showMessage(contact.body)
                                        }}

                                    >
                                        مشاهده پیغام
                                    </button>


                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn" onClick={() => answermessage(contact.email)}>
                                        پاسخ
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-danger delete-btn"
                                        onClick={()=>removeContact(contact._id)}
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
