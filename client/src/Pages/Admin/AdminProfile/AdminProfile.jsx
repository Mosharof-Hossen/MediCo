import { AiOutlineMail } from "react-icons/ai";
import useFetchAllUser from "../../../API/AdminApi/useFetchAllUser";
import useFetchPaymentManageAdmin from "../../../API/AdminApi/useFetchPaymentManageAdmin";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuthContext from "../../../Hooks/useAuthContext";
import userDefaultImage from "../../../assets/login/user.png"
import useFetchAdsAdmin from "../../../API/AdminApi/useFetchAdsAdmin";

const AdminProfile = () => {
    const { user } = useAuthContext();
    const { data: payments, isLoading, isError } = useFetchPaymentManageAdmin({});
    const { data: users, isLoading: userLoading } = useFetchAllUser()
    const { data: ads, isLoading: adsLoading } = useFetchAdsAdmin();

    if (isLoading || userLoading || adsLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    const totalPrice = payments?.reduce((a, b) => a + b.price, 0);
    const totalOrder = payments?.reduce((a, b) => a + b.items.length, 0)
    const totalUser = users.filter(i => i.role == "user");
    const seller = users.filter(i => i.role == "seller");
    const pending = ads?.filter(item => item.status == "Pending")


    return (
        <div>
            <SectionTitle heading={"Transaction Overview"} subHeading={"See an overview of all payments made through the platform, including transaction types, amounts, and statuses."}></SectionTitle>
            <div className="flex lg:flex-row flex-col gap-5 p-5 mt-5">
                <div className=" flex-1 bg-white p-5 rounded-lg space-y-5">
                    <img src={user?.photoURL ? user.photoURL : userDefaultImage} className=" w-64 mx-auto" alt="" />
                    <h2 className="text-center text-3xl font-semibold">{user?.displayName}</h2>
                </div>
                <div className="flex-1 space-y-3">
                    <h2 className="text-4xl font-semibold">Your info</h2>
                    <p className="text-2xl flex items-center text-blue-500 gap-2 font-semibold"><AiOutlineMail /> {user?.email}</p>
                </div>
            </div>
            <div className="px-8">
                <div className="grid grid-cols-2 gap-5 my-5">
                    <div className="bg-red-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Total Revenue</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{totalPrice}$</h1>
                    </div>

                    <div className="bg-blue-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Total Order</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{totalOrder}</h1>
                    </div>

                    <div className="bg-orange-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Total Users</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{totalUser?.length}</h1>
                    </div>

                    <div className="bg-green-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Total Seller</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{seller?.length}</h1>
                    </div>
                    <div className="bg-amber-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Pending Ads</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{pending?.length}</h1>
                    </div>

                    <div className="bg-teal-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Running Ads</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{ads?.length - pending?.length}</h1>
                    </div>
                </div>
            </div>


        </div >
    );
};

export default AdminProfile;