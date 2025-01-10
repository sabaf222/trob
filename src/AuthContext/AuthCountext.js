import { createContext } from "react";

let AuthContext=createContext({
    isLogin:false,
    userInfos:{},
    token:null,
    login:()=>{},
    logout:()=>{},
    globalSearch:()=>{}
})


export default AuthContext