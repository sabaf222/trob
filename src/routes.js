import Index from "./Pages/Index/Index";
import UserBasket from "./Pages/UserBasket/UserBasket";
import Register from "./Pages/Register/Register";
import Login from './Pages/Login/Login'
import Category from "./Pages/Category/Category";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Blogs from "./Pages/Blogs/Blogs";
import BlogInfo from "./Pages/BlogInfo/BlogInfo";


import AdminPanel from './Pages/P-Admin/index'

import Products from "./Pages/P-Admin/Products/Products";
import AdminIndex from './Pages/P-Admin/Index/Index'
import AdminMenus from './Pages/P-Admin/Menus/Menus'
import AdminUsers from './Pages/P-Admin/Users/Users'
import Offs from './Pages/P-Admin/Offs/Offs'
import AdminCategory from './Pages/P-Admin/Category/Category'
import Discounts from "./Pages/P-Admin/Discount/Discount";
import AdminContact from './Pages/P-Admin/Contact/Contact'
import PriveteAdminPanel from "./Pages/Private/PriveteAdminPanel";

let routes = [
    { path: '/', element: <Index /> },
    { path: '/userbasket', element: <UserBasket /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/category/:categoryName', element: <Category /> },
    { path: '/product-info/:shortName', element: <ProductDetails /> },
    { path: '/blogs', element: <Blogs /> },
    { path: '/blog-info', element: <BlogInfo /> },




    {
        path: '/p-admin/*',
        element:<PriveteAdminPanel> <AdminPanel/> </PriveteAdminPanel> ,
        children: [

            {path:'',element:<AdminIndex/>},
            { path: 'products', element: <Products /> },
            {path:'menus',element:<AdminMenus/>},
            {path:'users',element:<AdminUsers/>},
            {path:'offs',element:<Offs/>},
            {path:'category',element:<AdminCategory/>},
            {path:'discount',element:<Discounts/>},
            {path:'contacts',element:<AdminContact/>},





        ]
    }





]
export default routes