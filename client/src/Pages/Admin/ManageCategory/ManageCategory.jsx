import useFetchAllMedicinesAdmin from "../../../API/AdminApi/useFetchAllMedicinesAdmin";
import useFetchGetAllCategories from "../../../API/useFetchGetAllCategories";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddCategoryModal from "./AddCategoryModal";
import Swal from 'sweetalert2'
import useFetchDeleteCategory from "../../../API/AdminApi/useFetchDeleteCategory";
import EditCategoryModal from "./EditCategoryModal";
import { useState } from "react";

const ManageCategory = () => {
    const [viewItem, setViewItem] = useState({});
    const { data: categories, isError, isLoading, } = useFetchGetAllCategories()
    const { data: items, isLoading: itemLoading } = useFetchAllMedicinesAdmin();
    const categoryDeleteMutation = useFetchDeleteCategory();

    if (isLoading || itemLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    const updateCategory = categories.map((categoryItem) => {
        const totalItems = items.filter(item => categoryItem.categoryNameId == item.category);
        categoryItem.totalItem = totalItems.length;
        return categoryItem;
    })

    const handleAddCategory = () => {
        document.getElementById("addCategoryModal").showModal()
    }

    const handleEditCategory = (category) => {
        setViewItem(category)
        document.getElementById("editCategoryModal").showModal()
    }

    const handleDeleteCategory = (id) => {
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
                categoryDeleteMutation.mutate(id);
            }
        });
    }

    return (
        <div className="p-5">
            <SectionTitle heading="Categories at a Glance" subHeading="View all available product categories, including total items listed under each and the option to edit or remove them."></SectionTitle>

            <div className="bg-white p-5 rounded">
                <div className="my-3" >
                    <button onClick={handleAddCategory} className="btn bg-green-500 hover:bg-green-600 text-white">Add Category</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className='bg-primary-c text-white'>
                                <th className="rounded-tl-3xl"></th>
                                <th>Email</th>
                                <th>Category Name</th>
                                <th>Category Id</th>
                                <th>Total Items</th>
                                <th>Edit</th>
                                <th className="rounded-tr-3xl">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                updateCategory?.map((category, i) => <tr key={category._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-14 rounded-xl">
                                                <img src={category.categoryImage} />
                                            </div>
                                        </div>
                                    </th>
                                    <th>{category.categoryName}</th>
                                    <th>{category.categoryNameId}</th>
                                    <th>{category.totalItem}</th>
                                    <th><button onClick={()=>handleEditCategory(category)}><FaEdit className="text-2xl text-primary-c" /></button></th>
                                    <th><button onClick={() => handleDeleteCategory(category._id)}><FaTrashAlt className="text-2xl text-red-500" /></button></th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <dialog id="addCategoryModal" className="modal">
                <AddCategoryModal></AddCategoryModal>
            </dialog>
            <dialog id="editCategoryModal" className="modal">
                <EditCategoryModal category={viewItem}></EditCategoryModal>
            </dialog>
        </div>
    );
};

export default ManageCategory;