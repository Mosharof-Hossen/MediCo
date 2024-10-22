import { useParams } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useFetchUserSelectedItem from "../../../API/SellerApi/useFetchUserSelectedItem";

const UserSelectedItems = () => {
    const { id } = useParams();

    const { data: items, isLoading, isError } = useFetchUserSelectedItem(id);
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(items);
    return (
        <div>
            <SectionTitle heading={'User Selected Items'} subHeading={'Analyze the preferences of users based on the items they have selected. '}></SectionTitle>
            <div className="bg-white p-5 rounded">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className='bg-primary-c text-white'>
                                <th className="rounded-tl-3xl"></th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Company</th>
                                <th className="rounded-tr-3xl">Unit Per Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                items?.itemDetails?.map((item, i) => <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-14 rounded-xl">
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                    </th>
                                    <td>{item.itemName}</td>
                                    <td>{item.category}</td>
                                    <td>{item.company}</td>
                                    <td>{item.perUnitPrice}$</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default UserSelectedItems;