import { useState } from "react";
import useFetchPaymentInfo from "../../../API/UserApi/useFetchPaymentInfo";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';


const PaymentHistory = () => {
    const { data, isLoading, isError } = useFetchPaymentInfo()
    const [pdfURL, setPdfURL] = useState(null);

    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(data);
    const generatePDF = () => {
        const doc = new jsPDF();

        // Define the columns and rows of the table
        const columns = ['ID', 'User Email', 'UserId', 'TransactionId', 'Date', 'Price $']; // Table headers
        const rows = data.map((item, i) => [i + 1, item.userEmail, item.userId, item.transactionId, item.date.split("T")[0], item.totalPrice])
        // Adding title to the PDF
        doc.text('User Payment Information Table', 14, 20);


        // Generating the table in PDF
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 30, // Starting Y position of the table
            theme: 'grid', // Can be 'striped', 'grid', 'plain', etc.
            margin: { top: 10 },
            styles: {
                fontSize: 10,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [22, 160, 133], // Custom header color (RGB)
            },
            bodyStyles: {
                textColor: [0, 0, 0], // Text color for table data
            },
        });

        const pdfBlob = doc.output('blob');
        const pdfURL = URL.createObjectURL(pdfBlob);
        setPdfURL(pdfURL);
    }

    const downloadPDF = () => {
        const doc = new jsPDF();
        const columns = ['ID', 'User Email', 'UserId', 'TransactionId', 'Date', 'Price $']; // Table headers
        const rows = data.map((item, i) => [i + 1, item.userEmail, item.userId, item.transactionId, item.date.split("T")[0], item.totalPrice])
        // Adding title to the PDF
        doc.text('User Information Table', 14, 20);

        // Generating the table in PDF
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 30, // Starting Y position of the table
            theme: 'grid', // Can be 'striped', 'grid', 'plain', etc.
            margin: { top: 10 },
            styles: {
                fontSize: 10,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [22, 160, 133], // Custom header color (RGB)
            },
            bodyStyles: {
                textColor: [0, 0, 0], // Text color for table data
            },
        });

        doc.save('payment.pdf')
    }


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
                                <th>Date</th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>Total Price</th>
                                <th className="rounded-tr-3xl">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                data?.map((item, i) => <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    <th>{item.date.split("T")[0]}</th>
                                    <th>{item.userEmail}</th>
                                    <th>{item.transactionId}</th>
                                    <th>${item.totalPrice}</th>
                                    <th>{item.status}</th>
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
                <div className="p-10 text-center space-y-6">
                    {
                        pdfURL ? <button onClick={downloadPDF} className="px-3 py-2 text-white bg-primary-c hover:bg-teal-600 rounded">
                            Download PDF
                        </button>
                            :
                            <button onClick={generatePDF} className="px-3 py-2 text-white bg-primary-c hover:bg-teal-600 rounded">
                                Generate PDF
                            </button>
                    }
                    {
                        pdfURL && <div>
                            <iframe src={pdfURL} height='500px' className="w-full" title="PDF Preview"></iframe>


                        </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default PaymentHistory;