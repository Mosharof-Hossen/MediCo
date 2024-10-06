import useFetchGetItem from "../../API/useFetchGetItem";
import ProductCart from "./ProductCart";


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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                {
                    data.map((item) => <ProductCart key={item._id} item={item}></ProductCart>)
                }
            </div>
        </div>
    );
};

export default Shop;