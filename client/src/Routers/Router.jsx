import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import Category from "../Pages/Category/Category";
import Cart from "../Pages/User/Cart/Cart";
import PaymentHistory from "../Pages/User/PaymentHistory/PaymentHistory";
import UserProfile from "../Pages/User/UserProfile/UserProfile";
import AdminProfile from "../Pages/Admin/AdminProfile/AdminProfile";
import MangeUser from "../Pages/Admin/MangeUser/MangeUser";
import SalesReport from "../Pages/Admin/SalesReport/SalesReport";
import ManageBanner from "../Pages/Admin/ManageBanner/ManageBanner";
import SellerProfile from "../Pages/Seller/SellerProfile/SellerProfile";
import AskForAds from "../Pages/Seller/AskForAds/AskForAds";
import Checkout from "../Pages/User/Checkout/Checkout";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../Layout/Dashboard";
import PrivateAdminRouter from "./PrivateAdminRouter";
import PrivateSellerRouter from "./PrivateSellerRouter";
import PaymentHistorySeller from "../Pages/Seller/PaymentHistory/PaymentHistorySeller";
import ManageMedicinesSeller from "../Pages/Seller/ManageMedicines/ManageMedicinesSeller";
import UserSelectedItems from "../Pages/Seller/UserSelectedItems/UserSelectedItems";
import ManageCategory from "../Pages/Admin/ManageCategory/ManageCategory";

// const axios = axios;
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: '/shop',
                element: <Shop></Shop>
            },
            {
                path: "/sign-up",
                element: <SignUp></SignUp>,
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/products/:category",
                element: <Category></Category>
            }
        ]
    },
    {
        path: "/dashboard/user",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "/dashboard/user",
                element: <PrivateRouter> <UserProfile></UserProfile></PrivateRouter>
            },
            {
                path: "/dashboard/user/cart",
                element: <PrivateRouter><Cart></Cart></PrivateRouter>
            },
            {
                path: "/dashboard/user/checkout",
                element: <PrivateRouter><Checkout></Checkout> </PrivateRouter>
            },
            {
                path: "/dashboard/user/payment-history",
                element: <PrivateRouter><PaymentHistory></PaymentHistory></PrivateRouter>
            }
        ]
    },
    {
        path: "/dashboard/admin",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "/dashboard/admin",
                element: <PrivateAdminRouter><AdminProfile></AdminProfile></PrivateAdminRouter>
            },
            {
                path: "/dashboard/admin/manage-user",
                element: <PrivateAdminRouter><MangeUser></MangeUser></PrivateAdminRouter>
            },
            {
                path: "/dashboard/admin/manage-category",
                element: <PrivateAdminRouter><ManageCategory></ManageCategory></PrivateAdminRouter>
            },
            {
                path: "/dashboard/admin/sales-report",
                element: <PrivateAdminRouter><SalesReport></SalesReport></PrivateAdminRouter>
            },
            {
                path: "/dashboard/admin/manage-banner",
                element: <PrivateAdminRouter><ManageBanner></ManageBanner></PrivateAdminRouter>
            },
        ]
    },
    {
        path: "/dashboard/seller",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "/dashboard/seller",
                element: <PrivateSellerRouter><SellerProfile></SellerProfile></PrivateSellerRouter>
            },
            {
                path: "/dashboard/seller/manage-medicines",
                element: <PrivateSellerRouter><ManageMedicinesSeller></ManageMedicinesSeller></PrivateSellerRouter>
            },
            {
                path: "/dashboard/seller/payment-history",
                element: <PrivateSellerRouter><PaymentHistorySeller></PaymentHistorySeller></PrivateSellerRouter>
            },
            {
                path: "/dashboard/seller/user-selected-items/:id",
                element: <PrivateSellerRouter><UserSelectedItems></UserSelectedItems></PrivateSellerRouter>,
            },
            {
                path: "/dashboard/seller/ask-for-ads",
                element: <PrivateSellerRouter><AskForAds></AskForAds></PrivateSellerRouter>
            }
        ]
    }

])



export default router;