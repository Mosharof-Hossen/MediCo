import useFetchAllUser from "../../../API/AdminApi/useFetchAllUser";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const MangeUser = () => {
    const { data: users, isLoading } = useFetchAllUser()
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    const user = users.filter(i=>i.role =="user");
    const seller = users.filter(i=>i.role =="seller");
    console.log(users);
    return (
        <div>
            <SectionTitle heading={"Transaction Overview"} subHeading={"See an overview of all payments made through the platform, including transaction types, amounts, and statuses."}></SectionTitle>
            <div className="px-8">
                <div className="grid grid-cols-2 gap-5 my-5">
                    <div className="bg-red-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Total Seller</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{seller?.length}</h1>
                    </div>

                    <div className="bg-green-300 rounded p-5 space-y-2">
                        <h2 className="text-xl text-gray-600 text-center font-semibold">Total Users</h2>
                        <h1 className="text-3xl text-center font-bold text-gray-900">{user?.length}</h1>
                    </div>
                </div>
            </div>
            <div className="bg-white p-5 rounded">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className='bg-primary-c text-white'>
                                <th className="rounded-tl-3xl"></th>
                                <th>Email</th>
                                <th>Id</th>
                                <th>Role</th>
                                <th className="rounded-tr-3xl">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((item, i) => <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    <th>{item.email ? item.email : "x@x.com"}</th>
                                    <th>{item.userId}</th>
                                    <th>{item.role}</th>
                                    <th>Edit</th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MangeUser;