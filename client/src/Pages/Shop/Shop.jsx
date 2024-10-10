import useFetchGetAllCategories from "../../API/useFetchGetAllCategories";
import useFetchGetItem from "../../API/useFetchGetItem";
import ProductCart from "./ProductCart";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ItemModal from "../Category/ItemModal";

const Shop = () => {
    const [viewItem, setViewItem] = useState({})

    const itemPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const { register, watch } = useForm({
        defaultValues: {
            categories: [],
            discounted: false,
            search: '',
            sort: ""
        }
    })
    const selectedCategories = watch("categories");
    const isDiscounted = watch("discounted");
    const searchQuery = watch('search');
    const sort = watch("sort")

    const { data, isLoading: dataLoading, isError } = useFetchGetItem(selectedCategories, isDiscounted, searchQuery, sort, itemPerPage, currentPage);
    const { data: categories, isError: categoryError, isLoading: categoryLoading } = useFetchGetAllCategories();

    if (isError || categoryError) {
        return
    }
    const viewItemFunction = (item) => {
        setViewItem(item);
        document.getElementById('my_modal_2').showModal()
    }
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* Page content here */}
                    <div>
                        <div className="p-5">
                            <label className="input input-bordered flex items-center gap-2 md:w-2/3 mx-auto">
                                <input type="text" {...register('search')} className="grow " placeholder="Search Name" />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd" />
                                </svg>
                            </label>
                        </div>
                        <div className="flex  items-center">
                            <label htmlFor="my-drawer-2" className="btn mr-auto mx-5 drawer-button lg:hidden">
                                Filter <FaAngleDoubleRight className="text-2xl" />
                            </label>
                            <div className="flex justify-center items-center mx-5 text-gray-500">
                                <span className="w-24">Sort by:</span>
                                <select  {...register("sort")} className="select select-bordered w-full max-w-xs">
                                    <option value={sort} disabled >Select an Option</option>
                                    <option value={"low-to-high"}>Price: Low to High</option>
                                    <option value={"high-to-low"}>Price: High to Low</option>
                                </select>

                            </div>
                        </div>
                    </div>
                    {
                        dataLoading ?
                            <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
                            :
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                                {
                                    data.items.map((item) => <ProductCart key={item._id} item={item} viewItemFunction={viewItemFunction}></ProductCart>)
                                }
                            </div>
                    }
                    <dialog id="my_modal_2" className="modal">
                        <ItemModal item={viewItem}></ItemModal>
                    </dialog>
                    <div className="flex justify-center mt-5">
                        {
                            [...Array(data?.totalPage).keys()].map(page => <button
                                key={page}
                                className={currentPage == page + 1 ? "text-xl px-5 bg-primary-c text-white py-3 mx-1 border-2 rounded-full" : "text-xl px-5 py-3 mx-1 border-2 rounded-full"}
                                onClick={() => setCurrentPage(page + 1)}
                            >

                                {page + 1}
                            </button>)
                        }
                    </div>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu bg-base-200 text-base-content min-h-full lg:w-48 w-52 p-4 lg:mt-0 mt-16">
                        <div className="space-y-2">
                            <h4 className="text-2xl font-bold">Categories</h4>
                            <div className="space-y-2  font-semibold text-gray-500 ml-1 ">
                                <form action="">
                                    {
                                        categoryLoading ?
                                            <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
                                            :
                                            categories.map(category =>
                                                <div key={category._id} className="form-control">
                                                    <label className="label cursor-pointer flex justify-start gap-3">
                                                        <input value={category.categoryNameId} {...register('categories')} type="checkbox" className="checkbox" />
                                                        <p>{category.categoryName}</p>
                                                    </label>
                                                </div>
                                            )
                                    }
                                </form>
                            </div>
                            <label className="label cursor-pointer flex justify-start gap-3">
                                <input  {...register('discounted')} type="checkbox" className="checkbox" />
                                <h4 className="text-2xl font-bold">Discount</h4>
                            </label>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;