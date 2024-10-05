import sideImage from "../../assets/login/sideImage.png"
import bg from "../../assets/login/loginBg.jpg"
import { useForm } from "react-hook-form";
import SocialLinks from "../../Components/SocialLinks";
import useAuthContext from "../../Hooks/useAuthContext";
import { useState } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, } = useForm();
    const { loginByEmailAndPassword } = useAuthContext()
    const [err, setErr] = useState("")
    const location = useLocation();
    const navigate = useNavigate()
    const onSubmit = data => {
        console.log(data)
        loginByEmailAndPassword(data.email, data.password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully Login",
                    showConfirmButton: false,
                    timer: 1500
                });
                setErr("")
                navigate(location?.state ? location.state : "/")

            })
            .catch(() => {
                setErr("Invalid Email or Password")
            })
    };
    return (
        <div className="bg-cover  min-h-screen bg-no-repeat "
            style={{
                backgroundImage: `url("${bg}")`
            }}
        >
            <div className=" bg-opacity-80">
                <div className="hero  min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse  gap-20 lg:px-20">
                        <div className="text-center  flex-1 w-full">
                            <img src={sideImage} alt="" className="w-full" />
                        </div>
                        <div className="card   w-full flex-1 shrink-0 rounded shadow-2xl border border-gray-300">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <h1 className="text-4xl font-bold text-center mb-5">Sign In</h1>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered" {...register("password", { required: true })} required />
                                </div>


                                <div className="form-control mt-6">
                                    <button className="btn bg-primary-c border-none text-white text-xl hover:bg-teal-500">Login</button>
                                    {
                                        err && <p className="text-red-500 font-semibold text-center mt-2">{err}</p>
                                    }
                                </div>
                            </form>
                            <SocialLinks value="/sign-up"></SocialLinks>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;