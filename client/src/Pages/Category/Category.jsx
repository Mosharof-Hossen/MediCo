import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useFetchProductByCategory from '../../API/useFetchProductByCategory';
import { FaEye } from 'react-icons/fa';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import ItemModal from './ItemModal';
import { useState } from 'react';
import useAuthContext from '../../Hooks/useAuthContext';
import useFetchPostItemToCart from '../../API/useFetchPostItemToCart';

const Category = () => {
    const category = useParams();
    const { user } = useAuthContext();
    const [viewItem, setViewItem] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const addItemToCartMutation = useFetchPostItemToCart();


    const { data: products, isError, isLoading } = useFetchProductByCategory(category.category)

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
    const handleCart = (item) => {
        if (!user) {
            navigate("/login", { state: location.pathname });
        }
        else {
            addItemToCartMutation.mutate({
                useEmail: user.email,
                userId: user.uid,
                itemId: item._id,
                quantity: 1
            })
        }
    }
    return (
        <div className='px-10 space-y-10'>
            <SectionTitle heading={"Quality Health Products You Can Trust"} subHeading={"Discover top-rated products from trusted vendors to support your health and well-being."}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className=''>
                                <th></th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Brand</th>
                                <th>Unit Per Price</th>
                                <th>View</th>
                                <th>Add to Cart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                products.map((item, i) => <tr key={item._id}>
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
                                    <td><button onClick={() => handleCart(item)} className='flex items-center bg-primary-c text-white px-3 py-2 rounded'>Add to Cart</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <ItemModal item={viewItem}></ItemModal>
            </dialog>
        </div>
    );
};

export default Category;