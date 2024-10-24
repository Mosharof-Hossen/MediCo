import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const useFetchAddItemSeller = () => {
    const axios = useAxios();
    const addItemApi = async (data) => {
        const res = await axios.post(`/add-item-seller`, data);
        return res.data;
    }

    const addItemSellerMutation = useMutation({
        mutationKey: ["addItemSeller"],
        mutationFn: addItemApi,
        onSuccess: () => {
            console.log("created");
        }
    })
    return addItemSellerMutation
};

export default useFetchAddItemSeller;