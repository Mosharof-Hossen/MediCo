import { Link } from "react-router-dom";
import useFetchPaymentManageAdmin from "../../../API/AdminApi/useFetchPaymentManageAdmin";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const PaymentManage = () => {
    const { data: payments, isLoading, isError } = useFetchPaymentManageAdmin();
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(payments);
    return (
        <div>
            <SectionTitle heading={"Transaction Overview"} subHeading={"See an overview of all payments made through the platform, including transaction types, amounts, and statuses."}></SectionTitle>
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
                                    <th className={item.status == "Pending" ? " text-red-500" : item.status == "Processing" ? " text-orange-500" : item.status == "Ongoing" ? " text-blue-500" : " text-green-500"}>
                                        {item.status} </th>
                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>

            </div>
        </div >
    );
};

export default PaymentManage;