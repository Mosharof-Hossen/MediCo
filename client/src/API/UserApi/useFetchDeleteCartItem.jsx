import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import useFetchGetCartItem from "./useFetchGetCartItem";

const useFetchDeleteCartItem = () => {
    const { refetch } = useFetchGetCartItem()
    const axios = useAxios();
    const deleteApi = async (itemId) => {
        const res = await axios.delete(`/user/cart/${itemId}`);
        return res.data;
    }
    const cartItemDeleteMutation = useMutation({
        mutationKey: ["cartItemDelete"],
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
    return cartItemDeleteMutation
};

export default useFetchDeleteCartItem;