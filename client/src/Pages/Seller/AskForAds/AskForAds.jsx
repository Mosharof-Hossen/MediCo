import { FaPlus } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import AddAdsModal from "./AddAdsModal";
import useFetchAdsSeller from "../../../API/SellerApi/useFetchAdsSeller";

const AskForAds = () => {
    const { data: ads, isLoading } = useFetchAdsSeller();
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    const handleAddAds = () => {
        document.getElementById("addAdsModal").showModal();
    }
    console.log(ads);
    return (
        <div className='px-10 space-y-10'>
            <SectionTitle heading={"Advertise Your Medicines"} subHeading={"Boost visibility and reach more customers by promoting your medicines on our platform."}></SectionTitle>
            <div className="bg-white p-5 rounded">
                <div className="flex justify-between items-center my-5">
                    <button onClick={handleAddAds} className="flex items-center bg-green-500 hover:bg-green-600 text-white gap-2 btn">Add Item <FaPlus></FaPlus></button>
                    <h3 className="text-2xl font-semibold ">Total Item: {ads?.length}</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">

                        <thead>
                            <tr className='bg-primary-c text-white'>
                                <th className="rounded-tl-3xl"></th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Discount</th>
                                <th className="rounded-tr-3xl">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ads?.map((item, i) => <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-14 rounded-xl">
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                    </th>
                                    <th>{item.itemName}</th>
                                    <th>{item.discountPercentage} %</th>
                                    <th className={item.status == "Pending"?"text-red-500":"text-green-500"}>{item.status}</th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <dialog id="addAdsModal" className="modal">
                <AddAdsModal></AddAdsModal>
            </dialog>

        </div>
    );
};

export default AskForAds;