import useFetchGetAllCategories from "../../API/useFetchGetAllCategories";
import useFetchGetItem from "../../API/useFetchGetItem";
import ProductCart from "./ProductCart";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Shop = () => {
    const { register, watch } = useForm({
        defaultValues: {
            categories: []
        }
    })
    const selectedCategories = watch("categories");

    const { data, isLoading: dataLoading, isError } = useFetchGetItem(selectedCategories);
    const { data: categories, isError: categoryError, isLoading: categoryLoading } = useFetchGetAllCategories();

    if (isError || categoryError) {
        return
    }
    console.log(categories);

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn mr-auto m-5 drawer-button lg:hidden">
                        Filter <FaAngleDoubleRight className="text-2xl" />
                    </label>
                    {
                        dataLoading ?
                            <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
                            :
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                                {
                                    data.map((item) => <ProductCart key={item._id} item={item}></ProductCart>)
                                }
                            </div>
                    }


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
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Shop;