import useFetchGetCartItem from "../../../API/UserApi/useFetchGetCartItem";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Cart = () => {
    const { data, isLoading, isError } = useFetchGetCartItem();
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(data);
    return (
        <div>
            <SectionTitle heading={"Review & Proceed to Checkout"} subHeading={"Check the items in your cart, update quantities, and proceed to a secure checkout."}></SectionTitle>
            <div>

            </div>
        </div>
    );
};

export default Cart;