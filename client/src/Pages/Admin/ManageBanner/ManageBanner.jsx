import useFetchAdsAdmin from "../../../API/AdminApi/useFetchAdsAdmin";
import useFetchAdsManageAdmin from "../../../API/AdminApi/useFetchAdsManageAdmin";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const ManageBanner = () => {
    // const [adsCondition, setAdsCondition] = useState(true)
    const { data: ads, isLoading } = useFetchAdsAdmin();
    const adsManageAdminMutation = useFetchAdsManageAdmin();
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    const pending = ads?.filter(item => item.status == "Pending")

    const handleAdsCondition = (id, condition) => {
        console.log(id, condition);
        if (condition === "Pending") {
            adsManageAdminMutation.mutate({
                id, condition: "Running"
            })
        } else {
            adsManageAdminMutation.mutate({
                id, condition: "Pending"
            })
        }
    }
    return (
        <div>
            <SectionTitle heading={"Transaction Overview"} subHeading={"See an overview of all payments made through the platform, including transaction types, amounts, and statuses."}></SectionTitle>
            <div className="px-8">
                <div className="grid grid-cols-2 gap-5 my-5">
                    <div className="bg-red-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Pending Ads</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{pending?.length}</h1>
                    </div>

                    <div className="bg-green-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Running Ads</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{ads?.length - pending?.length}</h1>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className='bg-primary-c text-white'>
                                <th className="rounded-tl-3xl"></th>
                                <th>Cover Image</th>
                                <th>Item Name</th>
                                <th>Seller Email</th>
                                <th>Discount</th>
                                <th>Status</th>
                                <th className="rounded-tr-3xl">Condition</th>
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
                                    <th className="break-words max-w-[150px] overflow-hidden text-ellipsis">{item.seller.sellerEmail}</th>
                                    <th className="break-words max-w-[150px] overflow-hidden text-ellipsis">{item.discountPercentage} %</th>
                                    <th className={item.status == "Pending" ? " text-red-500" : "text-green-500"}>
                                        {item.status} </th>
                                    <th>
                                        <input onClick={() => handleAdsCondition(item._id, item.status)} type="checkbox" className="toggle toggle-success" defaultChecked={item.status == "Pending" ? false : true} />
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default ManageBanner;