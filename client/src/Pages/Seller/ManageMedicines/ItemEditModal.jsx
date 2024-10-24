import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useFetchGetAllCategories from '../../../API/useFetchGetAllCategories';
import axios from 'axios';
import useFetchUpdateItemsSeller from '../../../API/SellerApi/useFetchUpdateItemsSeller';


const ItemEditModal = ({ item }) => {
    const { data: totalCategories, isError, isLoading } = useFetchGetAllCategories();
    const { register, handleSubmit, reset } = useForm();
    const itemUpdateSellerMutation = useFetchUpdateItemsSeller();

    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    const { _id, image, itemName, company, itemGenericName, itemMassUnit, discountPercentage, category, perUnitPrice, application, shortDescription } = item

    const onSubmit = async (data) => {

        if (data.image.length > 0) {
            const imageFile = { image: data.image[0] }
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imgbb}`,
                imageFile, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(res.data.status);
            if (res.data.status == 200) {
                itemUpdateSellerMutation.mutate({
                    image: res.data.data.display_url,
                    itemName: data.itemName,
                    company: data.company,
                    itemGenericName: data.itemGenericName,
                    itemMassUnit: data.itemMassUnit,
                    discountPercentage: data.discountPercentage,
                    category: data.category,
                    perUnitPrice: data.perUnitPrice,
                    application: data.application,
                    shortDescription: data.shortDescription,
                    id: _id
                })
            }
        }
        else {
            itemUpdateSellerMutation.mutate({
                itemName: data.itemName,
                company: data.company,
                itemGenericName: data.itemGenericName,
                itemMassUnit: data.itemMassUnit,
                discountPercentage: data.discountPercentage,
                category: data.category,
                perUnitPrice: data.perUnitPrice,
                application: data.application,
                shortDescription: data.shortDescription,
                id: _id
            })
        }
    };
    return (
        <div className="modal-box w-11/12 max-w-4xl space-y-5">
            {
                item && <>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h3 className='text-3xl font-bold underline '>Update Items</h3>
                        <div className='flex md:flex-row flex-col gap-5 '>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Item Name*</span>
                                </label>
                                <input type="text" defaultValue={itemName} placeholder="Item name" {...register("itemName", { required: true })} className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Company Name*</span>
                                </label>
                                <input type="text" defaultValue={company} placeholder="Company name" {...register("company", { required: true })} className="input input-bordered" required />
                            </div>
                        </div>

                        <div className='flex md:flex-row flex-col gap-5 '>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Item Generic Name*</span>
                                </label>
                                <input type="text" defaultValue={itemGenericName} placeholder="Item generic name" {...register("itemGenericName", { required: true })} className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Application*</span>
                                </label>
                                <input type="text" defaultValue={application} placeholder="Application" {...register("application", { required: true })} className="input input-bordered" required />
                            </div>
                        </div>

                        <div className='flex md:flex-row flex-col gap-5 '>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Category*</span>
                                </label>
                                <select defaultValue={category} {...register("category", { required: true })} className='select select-bordered'>
                                    {
                                        totalCategories?.map(category => <option key={category._id} value={`${category?.categoryNameId}`}>{category.categoryName}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Item Mass Unit*</span>
                                </label>
                                <input type="text" defaultValue={itemMassUnit} placeholder="Item Mass Unit" {...register("itemMassUnit", { required: true })} className="input input-bordered" required />
                            </div>
                        </div>

                        <div className='flex md:flex-row flex-col gap-5 '>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Per Unit Price*</span>
                                </label>
                                <input type="text" defaultValue={perUnitPrice} placeholder="Per unit price" {...register("perUnitPrice", { required: true })} className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Discount*</span>
                                </label>
                                <input type="text" defaultValue={discountPercentage} placeholder="Discount" {...register("discountPercentage", { required: true })} className="input input-bordered" required />
                            </div>
                        </div>

                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Short Description*</span>
                            </label>
                            <textarea defaultValue={shortDescription} placeholder="Short description........" {...register("shortDescription", { required: true })} className="textarea textarea-bordered textarea-lg text-justify w-full" required />
                        </div>

                        <input type="file" defaultValue={image} className="file-input file-input-bordered w-full max-w-xs mt-5" {...register("image")} />

                        <div className="form-control mt-6">
                            <button className="btn bg-primary-c text-white text-xl font-semibold hover:bg-teal-600">Update</button>
                        </div>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        {/* if there is a button, it will close the modal */}
                        <button onClick={() => reset()} className="btn bg-red-500 hover:bg-red-600 text-white">Close</button>
                    </form>
                </>
            }
        </div>
    );
};

ItemEditModal.propTypes = {
    item: PropTypes.object
};

export default ItemEditModal;