import { NavLink } from "react-router-dom";
import "./Navbar.css"
import logo from "../../assets/logo.png"
const Navbar = () => {

    const links = <>
        <NavLink to={"/"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Home</li></NavLink>
        <NavLink to={"/shop"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Shop</li></NavLink>
        <NavLink to={"/cart"} className={"lg:px-2  lg:mx-1 w-fit py-1 rounded  text-xl font-semibold "}><li>Cart</li></NavLink>
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
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;