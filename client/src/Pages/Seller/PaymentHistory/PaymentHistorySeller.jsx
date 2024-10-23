import { Link } from "react-router-dom";
import useFetchSellerPaymentHistory from "../../../API/SellerApi/useFetchSellerPaymentHistory";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useFetchDeliveryStatusSeller from "../../../API/SellerApi/useFetchDeliveryStatusSeller";


const PaymentHistorySeller = () => {
    const deliveryStatusMutation = useFetchDeliveryStatusSeller();
    const { data: payments, isLoading, isError } = useFetchSellerPaymentHistory();
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    const handleChange = (e, _id) => {
        const status = e.target.value;
        deliveryStatusMutation.mutate({
            status: status,
            id: _id
        })
    } 
    return (
        <div>
            <SectionTitle heading={"Payment History"} subHeading={"Review all past payments and transactions.Review all past payments and transactions."}></SectionTitle>
            <div className="bg-white p-5 rounded">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='bg-primary-c text-white'>
                                <th className="rounded-tl-3xl"></th>
                                <th>Date</th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>Total Price</th>
                                <th>Payment</th>
                                <th>Products</th>
                                <th className="rounded-tr-3xl">Delivery</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                payments?.map((item, i) => <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    <th>{item.date.split("T")[0]}</th>
                                    <th className="break-words max-w-[150px] overflow-hidden text-ellipsis">{item.userEmail}</th>
                                    <th className="break-words max-w-[150px] overflow-hidden text-ellipsis">{item.transactionId}</th>
                                    <th>${item.price}</th>
                                    <th className="text-green-500">Done</th>
                                    <th><Link to={`/dashboard/seller/user-selected-items/${item._id}`} className="underline text-blue-500">List</Link></th>
                                    <th>
                                        <form>
                                            <select defaultValue={item.status} onChange={(e) => handleChange(e, item._id)} className={item.status == "Pending" ? "select select-bordered text-red-500" : item.status == "Processing" ? "select select-bordered text-orange-500" : item.status == "Ongoing"?"select select-bordered text-blue-500":"select select-bordered text-green-500"}>
                                            <option className="text-red-500" value="Pending">Pending</option>
                                            <option className="text-orange-500" value="Processing">Processing</option>
                                            <option className="text-blue-500" value="Ongoing">Ongoing</option>
                                            <option className="text-green-500" value="Done">Done</option>
                                        </select>
                                    </form>

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

export default PaymentHistorySeller;