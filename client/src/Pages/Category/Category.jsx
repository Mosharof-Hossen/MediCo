import { useParams } from 'react-router-dom';
import useFetchProductByCategory from '../../API/useFetchProductByCategory';
import { FaEye } from 'react-icons/fa';

const Category = () => {
    const category = useParams();
    const { data: products, isError, isLoading } = useFetchProductByCategory(category.category)

    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(products);
    return (
        <div>

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
                                    <td><button className='flex items-center '><FaEye className='text-2xl text-primary-c' /></button></td>
                                    <td><button className='flex items-center bg-primary-c text-white px-3 py-2 rounded'>Add to Cart</button></td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Category;