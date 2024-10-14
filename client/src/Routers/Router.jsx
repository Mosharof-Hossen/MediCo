import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import Category from "../Pages/Category/Category";
import Dashboard from "../Layout/dashboard";
import Cart from "../Pages/User/Cart/Cart";
import PaymentHistory from "../Pages/User/PaymentHistory/PaymentHistory";
import UserProfile from "../Pages/User/UserProfile/UserProfile";
import AdminProfile from "../Pages/Admin/AdminProfile/AdminProfile";
import MangeUser from "../Pages/Admin/MangeUser/MangeUser";
import PaymentManage from "../Pages/Admin/PaymentManage/PaymentManage";
import SalesReport from "../Pages/Admin/SalesReport/SalesReport";
import ManageBanner from "../Pages/Admin/ManageBanner/ManageBanner";
import SellerProfile from "../Pages/Seller/SellerProfile/SellerProfile";
import ManageMedicines from "../Pages/Seller/ManageMedicines/ManageMedicines";
import AskForAds from "../Pages/Seller/AskForAds/AskForAds";
import Checkout from "../Pages/User/Checkout/Checkout";

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
                element: <UserProfile></UserProfile>
            },
            {
                path: "/dashboard/user/cart",
                element: <Cart></Cart>
            },
            {
                path: "/dashboard/user/checkout",
                element: <Checkout></Checkout>
            },
            {
                path: "/dashboard/user/payment-history",
                element: <PaymentHistory></PaymentHistory>
            }
        ]
    },
    {
        path: "/dashboard/admin",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "/dashboard/admin",
                element: <AdminProfile></AdminProfile>
            },
            {
                path: "/dashboard/admin/manage-user",
                element: <MangeUser></MangeUser>
            },
            {
                path: "/dashboard/admin/payment-manage",
                element: <PaymentManage></PaymentManage>
            },
            {
                path: "/dashboard/admin/sales-report",
                element: <SalesReport></SalesReport>
            },
            {
                path: "/dashboard/admin/manage-banner",
                element: <ManageBanner></ManageBanner>
            },
        ]
    },
    {
        path: "/dashboard/seller",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "/dashboard/seller",
                element: <SellerProfile></SellerProfile>
            },
            {
                path: "/dashboard/seller/manage-medicines",
                element: <ManageMedicines></ManageMedicines>
            },
            {
                path: "/dashboard/seller/payment-history",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "/dashboard/seller/ask-for-ads",
                element: <AskForAds></AskForAds>
            }
        ]
    }

])



export default router;