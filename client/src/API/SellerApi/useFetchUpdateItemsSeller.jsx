import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useFetchManageMedicinesSeller from "./useFetchManageMedicinesSeller";

const useFetchUpdateItemsSeller = () => {
    const { refetch } = useFetchManageMedicinesSeller();
    const axios = useAxios();
    const itemUpdateSellerAPI = async (item) => {
        const res = await axios.patch(`/update-medicine-seller`, item);
        return res.data;
    }
    const itemUpdateSellerMutation = useMutation({
        mutationKey: ['itemUpdateSeller'],
        mutationFn: itemUpdateSellerAPI,
        onSuccess: () => {
            document.getElementById("itemEditModal").close();
            refetch()
        }
    })
    return itemUpdateSellerMutation
};

export default useFetchUpdateItemsSeller;