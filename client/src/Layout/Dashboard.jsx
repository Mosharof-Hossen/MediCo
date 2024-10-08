import { NavLink, Outlet } from 'react-router-dom';
import logo from "../assets/logo.png"
import useFetchUserInfo from '../API/useFetchUserInfo';

const Dashboard = () => {

    const { data ,} = useFetchUserInfo()
    console.log(data);
    const links = <>
        <NavLink to={"/"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Home</li></NavLink>
        <NavLink to={"/dashboard/user/cart"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Cart</li></NavLink>
        <NavLink to={"/dashboard/user/payment-history"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Payment-History</li></NavLink>
    </>
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
                        <img src={logo} alt="" className="w-28 h-fit" />
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