import useFetchPaymentInfo from "../../../API/UserApi/useFetchPaymentInfo";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const PaymentHistory = () => {
    const { data, isLoading, isError } = useFetchPaymentInfo()

    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(data);

    return (
        <div className='px-5 space-y-10 bg-slate-100'>
            <SectionTitle heading={"Review & Proceed to Checkout"} subHeading={"Check the items in your cart, update quantities, and proceed to a secure checkout."}></SectionTitle>
            <div className="bg-white p-5 rounded">
                <div className="overflow-x-auto">
                    <div className="flex justify-between my-5 items-center">
                        {/* <h4 className="uppercase font-bold text-xl text-gray-500">Total orders: {data?.length}</h4> */}
                        {/* <h4 className="uppercase font-bold text-xl text-gray-500">Total Price: ${data?.reduce((acc, cur) => acc + cur.itemDetails.perUnitPrice * cur.quantity, 0)}</h4> */}

                    </div>
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className='bg-primary-c text-white'>
                                <th className="rounded-tl-3xl"></th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Unit Per Price</th>
                                <th>View</th>
                                <th className="rounded-tr-3xl">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                data?.map((item, i) => <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    {/* <th>
                                        <div className="avatar">
                                            <div className="w-14 rounded-xl">
                                                <img src={item.itemDetails.image} />
                                            </div>
                                        </div>
                                    </th> */}

                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default PaymentHistory;