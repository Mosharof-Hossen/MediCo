import { useForm } from "react-hook-form";
import useFetchPaymentManageAdmin from "../../../API/AdminApi/useFetchPaymentManageAdmin";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import logo from "../../../assets/logo.png"
import ReportDocument from "./ReportDocument";


const SalesReport = () => {
    const { register, handleSubmit, } = useForm();
    const [date, setDate] = useState({});
    const [pdf, setPdf] = useState(false)

    const { data: payments, isLoading, isError } = useFetchPaymentManageAdmin(date);
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    const pending = payments?.filter(item => item.status == "Pending")
    const ongoing = payments?.filter(item => item.status == "Ongoing")
    const processing = payments?.filter(item => item.status == "Processing")
    const done = payments?.filter(item => item.status == "Done")
    console.log(payments);

    const onSubmit = data => setDate(data);
    return (
        <div>
            <SectionTitle heading={"Transaction Overview"} subHeading={"See an overview of all payments made through the platform, including transaction types, amounts, and statuses."}></SectionTitle>
            <div className="px-8">
                <div className="grid grid-cols-2 gap-5 my-5">
                    <div className="bg-red-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Pending</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{pending?.length}</h1>
                    </div>

                    <div className="bg-blue-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Ongoing</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{ongoing?.length}</h1>
                    </div>

                    <div className="bg-orange-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Processing</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{processing?.length}</h1>
                    </div>

                    <div className="bg-green-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Done</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{done?.length}</h1>
                    </div>
                </div>
            </div>
            <div className="my-5 px-8">
                <form action="" onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                    <input type="date" {...register("startDate")} required className="input input-bordered " />
                    <input type="date" {...register("endDate")} required className="input input-bordered " />
                    <input className="btn bg-primary-c text-white hover:bg-teal-600" type="submit" value={"Filter"} />
                </form>
            </div>
            <div className="bg-white p-5 rounded">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='bg-primary-c text-white'>
                                <th className="rounded-tl-3xl"></th>
                                <th>Date</th>
                                <th>Seller Email</th>
                                <th>User Email</th>
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
                                    <th className="break-words max-w-[150px] overflow-hidden text-ellipsis">{item.sellerEmail}</th>
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

            <div>
                <button onClick={()=>setPdf(!pdf)} className="btn">PDF Generate</button>
                {
                    pdf &&
                    <PDFViewer style={{ width: "100%", height: "100vh" }}>
                        <ReportDocument data={payments} logoUrl={logo} title={"Sales Report"}  ></ReportDocument>
                    </PDFViewer>
                }
            </div>
        </div >
    );
};

export default SalesReport;