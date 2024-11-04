import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/logo.png"
import useAuthContext from "../../Hooks/useAuthContext";
import defaultUser from "../../assets/login/user.png"
import useFetchGetCartItem from "../../API/UserApi/useFetchGetCartItem";
import useFetchUserInfo from "../../API/useFetchUserInfo";

const Navbar = () => {
    const { user, logout } = useAuthContext();
    const { data: cartItem, isLoading } = useFetchGetCartItem();
    const { data: userInfo, isLoading: userInfoLoading, isError } = useFetchUserInfo()

    if (isLoading || userInfoLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    const handleLogout = () => {
        logout()
    }

    const links = <>
        <NavLink to={"/"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Home</li></NavLink>
        <NavLink to={"/shop"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Shop</li></NavLink>
        <NavLink to={"/contact"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Contact</li></NavLink>
    </>
    const profile = <>
        {
            userInfo?.role === "user"
            &&
            <NavLink to={"/dashboard/user"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Dashboard</li></NavLink>
        }
        {
            userInfo?.role === "seller"
            &&
            <NavLink to={"/dashboard/seller"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Dashboard</li></NavLink>
        }
        {
            userInfo?.role === "admin"
            &&
            <NavLink to={"/dashboard/admin"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Dashboard</li></NavLink>
        }
        <NavLink to={"/dashboard/user/update-profile"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Update Profile</li></NavLink>
        <Link onClick={handleLogout} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Logout</li></Link>
    </>
    return (
        <div>
            <div className="navbar bg-primary-c text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-primary-c rounded-box z-[1] mt-3 w-32 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <img src={logo} alt="" className="w-28 h-fit" />
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end gap-5">
                    {
                        userInfo?.role === "user" &&
                        <Link to={"/dashboard/user/cart"}>
                            <div className="indicator">
                                <span className="indicator-item ">{isLoading ? 0 : cartItem?.length}</span>
                                <div className=" grid w-10 h-5 place-items-center">
                                    <FaShoppingCart className="text-2xl" />
                                </div>
                            </div>
                        </Link>
                    }
                    {
                        user ?
                            <div className="dropdown dropdown-end bg-primary-c">
                                <div tabIndex={0} className="avatar flex items-center" >
                                    <div className="w-10 rounded-full " >
                                        <img className="drawer-button " src={user?.photoURL ? user?.photoURL : defaultUser} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu mt-5 text-xl bg-primary-c rounded-box z-[1] w-52 p-2 shadow">
                                    {
                                        profile
                                    }
                                </ul>
                            </div>
                            :
                            <Link to={"/sign-up"}><button className="flex items-center gap-1 text-xl"><FaRegUser /> Join Us</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;