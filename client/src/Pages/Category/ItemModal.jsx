import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useFetchGetAllCategories from '../../API/useFetchGetAllCategories';

const ItemModal = ({ item }) => {
    const { data: totalCategories, isError, isLoading } = useFetchGetAllCategories();
    const { register, handleSubmit, formState: { errors } } = useForm();

    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(item);
    const { image, itemName, company, itemGenericName, itemMassUnit, discountPercentage, category, perUnitPrice, application, shortDescription } = item

    const onSubmit = data => console.log(data);
    console.log(totalCategories);
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
                                <input type="text" placeholder="Item name" {...register("itemName", { required: true })} className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Company Name*</span>
                                </label>
                                <input type="text" placeholder="Company name" {...register("company", { required: true })} className="input input-bordered" required />
                            </div>
                        </div>

                        <div className='flex md:flex-row flex-col gap-5 '>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Item Generic Name*</span>
                                </label>
                                <input type="text" placeholder="Item generic name" {...register("itemGenericName", { required: true })} className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Application*</span>
                                </label>
                                <input type="text" placeholder="Application" {...register("application", { required: true })} className="input input-bordered" required />
                            </div>
                        </div>

                        <div className='flex md:flex-row flex-col gap-5 '>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Category*</span>
                                </label>
                                <select {...register("category", { required: true })} className='select select-bordered'>
                                    {
                                        totalCategories?.map(category => <option key={category._id} value={category?.categoryNameId}>{category.categoryName}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Item Mass Unit*</span>
                                </label>
                                <input type="text" placeholder="Item Mass Unit" {...register("itemMassUnit", { required: true })} className="input input-bordered" required />
                            </div>
                        </div>

                        <div className='flex md:flex-row flex-col gap-5 '>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Per Unit Price*</span>
                                </label>
                                <input type="text" placeholder="Per unit price" {...register("perUnitPrice", { required: true })} className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Discount*</span>
                                </label>
                                <input type="text" placeholder="Discount" {...register("discountPercentage", { required: true })} className="input input-bordered" required />
                            </div>
                        </div>

                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Short Description*</span>
                            </label>
                            <textarea placeholder="Short description........" {...register("shortDescription", { required: true })} className="textarea textarea-bordered textarea-lg text-justify w-full" required />
                        </div>

                        <input type="file" className="file-input file-input-bordered w-full max-w-xs mt-5" {...register("image")} required />

                        <div className="form-control mt-6">
                            <button className="btn bg-primary-c text-white text-xl font-semibold hover:bg-teal-600">Update</button>
                        </div>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn bg-red-500 hover:bg-red-600 text-white">Close</button>
                    </form>
                </>
            }
        </div>
    );
};

ItemModal.propTypes = {
    item: PropTypes.object
};

export default ItemModal;