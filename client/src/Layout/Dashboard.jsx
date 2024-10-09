import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from "../assets/logo.png"
import useFetchUserInfo from '../API/useFetchUserInfo';

const Dashboard = () => {

    const { data: userInfo, isLoading, isError } = useFetchUserInfo()
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }

    console.log(userInfo);
    let links
    if (userInfo?.role === "admin") {
        links = <>
            <NavLink to={"/dashboard/admin"} end className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Profile</li></NavLink>
            <NavLink to={"/dashboard/admin/manage-user"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Manage User</li></NavLink>
            <NavLink to={"/dashboard/admin/payment-manage"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Payment Manage</li></NavLink>
            <NavLink to={"/dashboard/admin/sales-report"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Sales Report</li></NavLink>
            <NavLink to={"/dashboard/admin/manage-banner"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Manage Banner</li></NavLink>
        </>
    }
    else if (userInfo?.role === "user") {
        links = <>
            <NavLink to={"/dashboard/user"} end className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Profile</li></NavLink>
            <NavLink to={"/dashboard/user/cart"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Cart</li></NavLink>
            <NavLink to={"/dashboard/user/payment-history"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Payment-History</li></NavLink>
        </>
    }
    else if (userInfo?.role === "seller") {
        links = <>
            <NavLink to={"/dashboard/seller"} end className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Profile</li></NavLink>
            <NavLink to={"/dashboard/seller/manage-medicines"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Manage Medicines</li></NavLink>
            <NavLink to={"/dashboard/seller/payment-history"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Payment-History</li></NavLink>
            <NavLink to={"/dashboard/seller/ask-for-ads"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Ask For Ads</li></NavLink>
        </>
    }

    return (
        <div className="drawer ">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar  bg-primary-c text-white w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex items-center flex-1">
                        <Link to={"/"}><img src={logo} alt="" className="w-28 h-fit" /></Link>
                    </div>
                    <div className="hidden flex-none lg:block">
                        <ul className="menu menu-horizontal">
                            {links}
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-primary-c text-white min-h-full w-80 p-4">
                    {links}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;