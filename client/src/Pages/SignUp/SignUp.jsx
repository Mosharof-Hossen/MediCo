import bg from "../../assets/login/loginBg.jpg"
import sideImage from "../../assets/login/sideImage.png"
import { useForm } from 'react-hook-form';
import SocialLinks from "../../Components/SocialLinks";
import useAuthContext from "../../Hooks/useAuthContext";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import useUserPost from "../../API/useUserPost";
import { useState } from "react";


const SignUp = () => {
    const userMutation = useUserPost();
    const { loginInByEmailPass } = useAuthContext();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [err, setError] = useState("");
    const [disable, setDisable] = useState(false)

    const onSubmit = async (data) => {
        setDisable(true)
        loginInByEmailPass(data.email, data.password)
            .then(async (currentUser) => {
                const imageFile = { image: data.image[0] };
                const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imgbb}`,
                    imageFile, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                })
                if (res.data.data.display_url) {
                    updateProfile(currentUser.user, {
                        photoURL: res.data.data.display_url
                    })
                        .then(() => {
                            userMutation.mutate({
                                email: data.email,
                                userId: currentUser.user.uid,
                                role: data.role
                            })
                            setError("")
                            setDisable(false)
                        })
                }
            })
            .catch(() => {
                setError("Email already in use.")
                setDisable(false)
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
                    <div className="hero-content flex-col lg:flex-row  gap-20 lg:px-20">
                        <div className="text-center  flex-1 w-full">
                            <img src={sideImage} alt="" className="w-full" />
                        </div>
                        <div className="card   w-full flex-1 shrink-0 rounded shadow-2xl border border-gray-300">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <h1 className="text-4xl font-bold text-center mb-5">Sign Up</h1>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Your Name</span>
                                    </label>
                                    <input type="text" placeholder="Enter Your Name" className="input input-bordered"  {...register("name", { required: true })} required />
                                </div>
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
                                    <input type="password" placeholder="password" className="input input-bordered" {...register("password", { required: true, minLength: 6 })} required />
                                    {
                                        errors?.password?.type == "minLength" && <p className="text-sm text-red-500 p-1">Password must be at least 6 character.</p>
                                    }
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold" >Upload Your Image</span>
                                    </label>
                                    <input type="file" className="file-input w-full max-w-xs " required {...register("image", { required: true })} />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Select Role</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs" {...register("role", { required: true })}>
                                        <option value={"user"}>User</option>
                                        <option value={"seller"} >Seller</option>
                                    </select>
                                </div>

                                <div className="form-control mt-6">
                                    <button disabled={disable} className="btn bg-primary-c border-none text-white text-xl hover:bg-teal-500">Sign Up</button>
                                    {
                                        err && <p className="text-red-500 font-semibold text-center mt-2">{err}</p>
                                    }
                                </div>
                            </form>
                            <SocialLinks value="/login"></SocialLinks>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;