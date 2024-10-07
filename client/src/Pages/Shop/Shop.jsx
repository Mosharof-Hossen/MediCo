import useFetchGetItem from "../../API/useFetchGetItem";
import ProductCart from "./ProductCart";
import { FaAngleDoubleRight } from "react-icons/fa";


const Shop = () => {
    const { data, isLoading, isError } = useFetchGetItem();
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(data);
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn mr-auto m-5 drawer-button lg:hidden">
                        Filter <FaAngleDoubleRight className="text-2xl"/>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                        {
                            data.map((item) => <ProductCart key={item._id} item={item}></ProductCart>)
                        }
                    </div>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full lg:w-48 w-52 p-4 lg:mt-0 mt-16">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default Shop;