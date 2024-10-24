import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useFetchManageMedicinesSeller from "./useFetchManageMedicinesSeller";

const useFetchAddItemSeller = () => {
    const { refetch } = useFetchManageMedicinesSeller();
    const axios = useAxios();
    const addItemApi = async (data) => {
        const res = await axios.post(`/add-item-seller`, data);
        return res.data;
    }

    const addItemSellerMutation = useMutation({
        mutationKey: ["addItemSeller"],
        mutationFn: addItemApi,
        onSuccess: () => {
            document.getElementById("addItemModal").close();
            refetch()
        }
    })
    return addItemSellerMutation
};

export default useFetchAddItemSeller;