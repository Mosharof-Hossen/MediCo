import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import useFetchGetAllCategories from "../useFetchGetAllCategories";

const useFetchDeleteCategory = () => {
    const { refetch } = useFetchGetAllCategories()
    const axios = useAxios();
    const categoryDeleteApi = async (id) => {
        const res = await axios.delete(`/delete-category/${id}`)
        return res.data;
    }
    const categoryDeleteMutation = useMutation({
        mutationKey: ['deleteCategory'],
        mutationFn: categoryDeleteApi,
        onSuccess: () => {
            Swal.fire({
                title: "Deleted!",
                text: "Category has been deleted.",
                icon: "success"
            });
            refetch()
        }
    })
    return categoryDeleteMutation
};

export default useFetchDeleteCategory;