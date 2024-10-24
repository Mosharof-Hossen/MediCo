
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuthContext from "../../../Hooks/useAuthContext";
import userDefaultImage from "../../../assets/login/user.png"
import { AiOutlineMail } from "react-icons/ai";
import useFetchManageMedicinesSeller from "../../../API/SellerApi/useFetchManageMedicinesSeller";
import useFetchSellerPaymentHistory from "../../../API/SellerApi/useFetchSellerPaymentHistory";

const SellerProfile = () => {
    const { user } = useAuthContext();

    const { data: items, isLoading, isError } = useFetchManageMedicinesSeller();
    const { data: payments, isLoading: loadingPayment } = useFetchSellerPaymentHistory();
    if (isLoading || loadingPayment) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    const revenue = payments?.reduce((a, c) => a + c.totalPrice, 0)
    const orders = payments?.reduce((a, c) => a + c.items.length, 0)

    return (
        <div className="">
            <SectionTitle heading={"hi, welcome back!"}></SectionTitle>
            <div className="px-8">

                <div className="grid grid-cols-3 gap-5 ">
                    <div className="bg-orange-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center">Items</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{items?.length}</h1>
                    </div>

                    <div className="bg-blue-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center">Revenue</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{revenue} $</h1>
                    </div>

                    <div className="bg-green-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center">Orders</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{orders}</h1>
                    </div>
                </div>
            </div>
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
        </div>
    );
};

export default SellerProfile;