import useFetchGetCartItem from "../../../API/UserApi/useFetchGetCartItem";

const Cart = () => {
    const { data, isLoading } = useFetchGetCartItem();
    console.log(data);
    return (
        <div>
            Cart
        </div>
    );
};

export default Cart;