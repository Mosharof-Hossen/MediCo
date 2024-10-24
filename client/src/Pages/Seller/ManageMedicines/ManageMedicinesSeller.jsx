import { useState } from "react";
import useFetchManageMedicinesSeller from "../../../API/SellerApi/useFetchManageMedicinesSeller";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import ItemModal from "../../Category/ItemModal";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import ItemEditModal from "./ItemEditModal";
import AddItemModal from "./AddItemModal";
import Swal from 'sweetalert2'
import useFetchItemDeleteSeller from "../../../API/SellerApi/useFetchItemDeleteSeller";

const ManageMedicinesSeller = () => {
    const [viewItem, setViewItem] = useState({});
    const { data: items, isLoading, isError } = useFetchManageMedicinesSeller();
    const itemDeleteSellerMutation = useFetchItemDeleteSeller();
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
        document.getElementById('itemEditModal').showModal()
    }

    const handleAddItem = () => {
        document.getElementById("addItemModal").showModal();
    }
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                itemDeleteSellerMutation.mutate(item._id)
            }
        });
    }
    console.log(items);
    return (
        <div className='px-10 space-y-10'>
            <SectionTitle heading={"Manage Medicines"} subHeading={"Control your inventory, update product details, and monitor the performance of your medicines."}></SectionTitle>
            <div className="bg-white p-5 rounded">
                <div className="flex justify-between items-center my-5">
                    <button onClick={handleAddItem} className="flex items-center bg-green-500 hover:bg-green-600 text-white gap-2 btn">Add Item <FaPlus></FaPlus></button>
                    <h3 className="text-2xl font-semibold ">Total Item: {items?.length}</h3>
                </div>
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
                                <th>Edit</th>
                                <th className="rounded-tr-3xl">Delete</th>
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
                                    <td><button onClick={() => handleItemView(item)} className='flex items-center '><FaEye className='text-2xl text-green-500' /></button></td>
                                    <td><button onClick={() => handleItemEdit(item)}><FaEdit className="text-2xl text-primary-c"></FaEdit></button></td>
                                    <td><button onClick={() => handleDelete(item)}><FaTrash className="text-2xl text-red-500"></FaTrash></button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <ItemModal item={viewItem}></ItemModal>
            </dialog>
            <dialog id="itemEditModal" className="modal">
                <ItemEditModal item={viewItem}></ItemEditModal>
            </dialog>
            <dialog id="addItemModal" className="modal">
                <AddItemModal></AddItemModal>
            </dialog>
        </div>
    );
};

export default ManageMedicinesSeller;