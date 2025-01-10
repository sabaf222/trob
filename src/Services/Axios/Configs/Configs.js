import axios from "axios";
const localStorageData=JSON.parse(localStorage.getItem("user"))
const apiRequists=axios.create({

    baseURL:"http://localhost:4000/v1",
    
    headers:{
        "Content-Type":"application/json",
        Authorization:`Beaere ${localStorageData?.token}`
    }
    
})

apiRequists.interceptors.request.use(
    (Configs)=>{
        // console.log("success");
        return Configs
        

    },
    (err)=>{
        // console.log('err');
       Promise.reject(err)
        

    }

)

apiRequists.interceptors.response.use(
    (response)=>{
        // console.log("response success");
        return response
        

    },
    (err)=>{
        // console.log('');
        const status=err.response.status

        // if(status===400){
        //     alert("400")
        // }else if(status===401){
        //     alert("401")
        // }else if(status===403){
        //     alert('403')
        // }else if(status===404){
        //     alert('404')
        // }

        return Promise.reject(err)
        

    }
)
export default apiRequists