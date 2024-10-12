import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useFetchGetCartItem from "./useFetchGetCartItem";

const useFetchUpdateQuantity = () => {
    const { refetch } = useFetchGetCartItem()
    const axios = useAxios();
    const updateApi = async (data) => {
        const res = await axios.patch(`/user/carts`, data);
        return res.data;
    }
    const updateQuantityMutation = useMutation({
        mutationKey: ["updateQuantity"],
        mutationFn: updateApi,
        onSuccess:()=>{
            refetch();
        }
    })
    return updateQuantityMutation
};

export default useFetchUpdateQuantity;