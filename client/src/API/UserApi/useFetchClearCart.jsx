import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Swal from 'sweetalert2'
import useFetchGetCartItem from "./useFetchGetCartItem";

const useFetchClearCart = () => {
    const { refetch } = useFetchGetCartItem()
    const axios = useAxios();
    const deleteApi = async (id) => {
        const res = await axios.delete(`/user/cart/${id}`);
        return res.data;
    }
    const clearCartMutation = useMutation({
        mutationKey: ["ClearCart"],
        mutationFn: deleteApi,
        onSuccess: () => {
            Swal.fire({
                title: "Deleted!",
                text: "All items has been deleted.",
                icon: "success"
            });
            refetch();
        }
    })
    return clearCartMutation;
};

export default useFetchClearCart;