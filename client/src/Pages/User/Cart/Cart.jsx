import { useState } from "react";
import useFetchGetCartItem from "../../../API/UserApi/useFetchGetCartItem";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import ItemModal from "../../Category/ItemModal";
import { FaEye, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import useFetchClearCart from "../../../API/UserApi/useFetchClearCart";
import Swal from "sweetalert2";
import useFetchDeleteCartItem from "../../../API/UserApi/useFetchDeleteCartItem";
import useFetchUpdateQuantity from "../../../API/UserApi/useFetchUpdateQuantity";

const Cart = () => {
    const [viewItem, setViewItem] = useState({});
    const clearCartMutation = useFetchClearCart();
    const cartItemDeleteMutation = useFetchDeleteCartItem();
    const { data: cartItem, isLoading, isError } = useFetchGetCartItem();
    const updateQuantityMutation = useFetchUpdateQuantity();


    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    const handleItemView = (item) => {
        setViewItem(item);
        document.getElementById('my_modal_3').showModal()
    }
    console.log(cartItem);
    const clearAll = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Clear All!"
        }).then((result) => {
            if (result.isConfirmed) {
                clearCartMutation.mutate(userId);
            }
        });
    }
    const handleDelete = (itemId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Clear All!"
        }).then((result) => {
            if (result.isConfirmed) {
                cartItemDeleteMutation.mutate(itemId);
            }
        });
    }

    const handleQuantity = (itemId, userId, quantity, sign) => {
        if (sign === "plus") {
            const count = quantity + 1;
            updateQuantityMutation.mutate({
                userId, itemId, quantity: count
            })
        }
        if (sign === "minus" && quantity > 1) {
            const count = quantity - 1;
            updateQuantityMutation.mutate({
                userId, itemId, quantity: count
            })
        }
    }

    return (
        <div className='px-5 space-y-10 bg-slate-100'>
            <SectionTitle heading={"Review & Proceed to Checkout"} subHeading={"Check the items in your cart, update quantities, and proceed to a secure checkout."}></SectionTitle>
            <div className="bg-white p-5 rounded">
                <div className="overflow-x-auto">
                    <div className="flex justify-between my-5 items-center">
                        <h4 className="uppercase font-bold text-xl text-gray-500">Total orders: {cartItem?.length}</h4>
                        <h4 className="uppercase font-bold text-xl text-gray-500">Total Price: ${cartItem?.reduce((acc, cur) => acc + cur.itemDetails.perUnitPrice * cur.quantity, 0)}</h4>
                        <div className="md:space-x-2 space-y-2">
                            <button className="btn bg-primary-c text-white ">Checkout</button>
                            <button onClick={() => clearAll(cartItem[0]?.userId)} className="btn bg-red-500 text-white "><FaTrashAlt></FaTrashAlt> Clear All</button>
                        </div>
                    </div>
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className='bg-primary-c text-white'>
                                <th className="rounded-tl-3xl"></th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Unit Per Price</th>
                                <th>View</th>
                                <th className="rounded-tr-3xl">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                cartItem?.map((item, i) => <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-14 rounded-xl">
                                                <img src={item.itemDetails.image} />
                                            </div>
                                        </div>
                                    </th>
                                    <td>{item.itemDetails.itemName}</td>
                                    <td>
                                        <div className="flex space-x-3 items-center">
                                            <button disabled={item?.quantity < 2 ? true : false} onClick={() => handleQuantity(item.itemId, item.userId, item?.quantity, 'minus')}><FaMinus className={item?.quantity < 2 ? "text-gray-400" : ""}></FaMinus></button>
                                            <span className="font-bold">{item?.quantity}</span>
                                            <button onClick={() => handleQuantity(item.itemId, item.userId, item?.quantity, 'plus')}><FaPlus></FaPlus></button>
                                        </div>
                                    </td>
                                    <td>$ {item.itemDetails.perUnitPrice * item.quantity}</td>
                                    <td><button onClick={() => handleItemView(item.itemDetails)} className='flex items-center '><FaEye className='text-2xl text-primary-c' /></button></td>
                                    <td><button onClick={() => handleDelete(item.itemId)} className='flex items-center '><FaTrashAlt className='text-2xl text-red-600' /></button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <ItemModal item={viewItem}></ItemModal>
            </dialog>
        </div>
    );
};

export default Cart;