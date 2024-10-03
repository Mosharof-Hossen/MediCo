import bg from "../../assets/login/loginBg.jpg"
import sideImage from "../../assets/login/sideImage.png"
const SignUp = () => {
    return (
        <div className="bg-cover  min-h-screen bg-no-repeat "
            style={{
                backgroundImage: `url("${bg}")`
            }}
        >
            <div className=" bg-opacity-80">
                <div className="hero  min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse lg:gap-2 gap-10 lg:px-14">
                        <div className="text-center  flex-1 w-full">
                            <img src={sideImage} alt="" className="w-full" />
                        </div>
                        <div className="card  w-full flex-1 shrink-0 rounded shadow-2xl border border-gray-300">
                            <form className="card-body">
                                <h1 className="text-4xl font-bold text-center mb-5">Sign Up</h1>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Your Name</span>
                                    </label>
                                    <input type="text" placeholder="Enter Your Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Upload Your Image</span>
                                    </label>
                                    <input type="file" className="file-input w-full max-w-xs " />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Select Role</span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs">
                                        <option value={"user"}>User</option>
                                        <option value={"seller"} >Seller</option>
                                    </select>
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn bg-primary-c border-none text-white text-xl hover:bg-teal-500">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;