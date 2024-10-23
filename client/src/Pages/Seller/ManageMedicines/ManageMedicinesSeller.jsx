import { useState } from "react";
import useFetchManageMedicinesSeller from "../../../API/SellerApi/useFetchManageMedicinesSeller";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import ItemModal from "../../Category/ItemModal";
import { FaEdit, FaEye } from "react-icons/fa";

const ManageMedicinesSeller = () => {
    const [viewItem, setViewItem] = useState({});
    const { data: items, isLoading, isError } = useFetchManageMedicinesSeller();
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    const handleItemView = (item) => {
        setViewItem(item);
        document.getElementById('my_modal_1').showModal()
    }
    const handleItemEdit = (item) => {
        setViewItem(item);
        document.getElementById('my_modal_2').showModal()
    }
    console.log(items);
    return (
        <div className='px-10 space-y-10'>
            <SectionTitle heading={"Manage Medicines"} subHeading={"Control your inventory, update product details, and monitor the performance of your medicines."}></SectionTitle>
            <div className="bg-white p-5 rounded">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className='bg-primary-c text-white'>
                                <th className="rounded-tl-3xl"></th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Brand</th>
                                <th>Unit Per Price</th>
                                <th>View</th>
                                <th className="rounded-tr-3xl">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                items.map((item, i) => <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-14 rounded-xl">
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                    </th>
                                    <td>{item.itemName}</td>
                                    <td>{item.company}</td>
                                    <td>$ {item.perUnitPrice}</td>
                                    <td><button onClick={() => handleItemView(item)} className='flex items-center '><FaEye className='text-2xl text-primary-c' /></button></td>
                                    <td><button onClick={()=>handleItemEdit(item)}><FaEdit className="text-2xl text-primary-c"></FaEdit></button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <ItemModal item={viewItem}></ItemModal>
            </dialog>
            <dialog id="my_modal_2" className="modal">
                <ItemModal item={viewItem}></ItemModal>
            </dialog>
        </div>
    );
};

export default ManageMedicinesSeller;