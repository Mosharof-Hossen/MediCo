import { FaCartPlus, FaWallet } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuthContext from "../../../Hooks/useAuthContext";
import userDefaultImage from "../../../assets/login/user.png"
import useFetchGetUserProfile from "../../../API/UserApi/useFetchGetUserProfile";
import { AiOutlineMail } from "react-icons/ai";

const UserProfile = () => {
    const { user } = useAuthContext();
    const { data, isError, isLoading } = useFetchGetUserProfile()
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(data);
    return (
        <div>
            <SectionTitle heading={"hi, welcome back!"}></SectionTitle>
            <div className="flex lg:flex-row flex-col gap-5 p-5">
                <div className=" flex-1 bg-white p-5 rounded-lg space-y-5">
                    <img src={user?.photoURL ? user.photoURL : userDefaultImage} className=" w-64 mx-auto" alt="" />
                    <h2 className="text-center text-3xl font-semibold">{user?.displayName}</h2>
                </div>
                <div className="flex-1 space-y-3">
                    <h2 className="text-4xl font-semibold">Your Activities</h2>
                    <p className="text-2xl flex items-center text-blue-500 gap-2 font-semibold"><AiOutlineMail  /> {user?.email}</p>
                    <p className="text-2xl flex items-center text-red-500 gap-2 font-semibold"><FaWallet /> Payment: {data?.length}</p>
                    <p className="text-2xl flex items-center text-yellow-500 gap-2 font-semibold"><FaCartPlus /> Total Orders : {data?.reduce((a, b) => a + b.itemIds.length, 0)}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;