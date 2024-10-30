import useAxios from '../../Hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useFetchGetAllCategories from '../useFetchGetAllCategories';

const useFetchUpdateCategory = () => {
    const { refetch } = useFetchGetAllCategories()
    const axios = useAxios();
    const updateCategoryApi = async (data) => {
        const res = await axios.patch(`/update-category`, data);
        return res.data;
    }
    const updateCategoryAdminMutation = useMutation({
        mutationKey: ["updateCategory"],
        mutationFn: updateCategoryApi,
        onSuccess: () => {
            document.getElementById("editCategoryModal").close();
            Swal.fire({
                title: "Updated!",
                text: "Category has been updated.",
                icon: "success"
            });
            refetch()
        }
    })
    return updateCategoryAdminMutation
};

export default useFetchUpdateCategory;