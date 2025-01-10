import apiRequists from "../Configs/Configs"


export const getAllProducts = () => {
    return apiRequists.get('/courses')
}