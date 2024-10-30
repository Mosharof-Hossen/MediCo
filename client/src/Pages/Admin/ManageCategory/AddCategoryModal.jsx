import axios from "axios";
import { useForm } from "react-hook-form";
import useFetchCreateCategoryAdmin from "../../../API/AdminApi/useFetchCreateCategoryAdmin";

const AddCategoryModal = () => {
    const { register, handleSubmit, reset } = useForm();
    const createCategoryMutation = useFetchCreateCategoryAdmin();

    const onSubmit = async (data) => {
        data.categoryNameId = data.categoryName.split(" ").join("-").toLowerCase();
        const imageFile = { image: data.categoryImage[0] };
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imgbb}`,
            imageFile,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        if (res.data.status) {
            data.categoryImage = res.data.data.display_url;
            createCategoryMutation.mutate(data);
        }

    }
    return (
        <div className="modal-box w-11/12 max-w-4xl space-y-5">
            {
                <>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h3 className='text-3xl font-bold underline '>Create Category</h3>
                        <div className='flex md:flex-row flex-col gap-5 '>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-lg">Category Name*</span>
                                </label>
                                <input type="text" placeholder="Category name" {...register("categoryName", { required: true })} className="input input-bordered" required />
                            </div>
                        </div>

                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Short Description*</span>
                            </label>
                            <textarea placeholder="Short description........" {...register("description", { required: true })} className="textarea textarea-bordered textarea-lg text-justify w-full" required />
                        </div>

                        <input type="file" className="file-input file-input-bordered w-full max-w-xs mt-5" {...register("categoryImage")} required />

                        <div className="form-control mt-6">
                            <button className="btn bg-primary-c text-white text-xl font-semibold hover:bg-teal-600">Create</button>
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

export default AddCategoryModal;