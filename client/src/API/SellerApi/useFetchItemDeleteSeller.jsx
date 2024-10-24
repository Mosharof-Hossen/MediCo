import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import useFetchManageMedicinesSeller from "./useFetchManageMedicinesSeller";


const useFetchItemDeleteSeller = () => {
    const { refetch } = useFetchManageMedicinesSeller()
    const axios = useAxios();
    const itemDeleteSellerApi = async (id) => {
        const res = await axios.delete(`/item-delete-seller/${id}`);
        return res.data;
    }
    const itemDeleteSellerMutation = useMutation({
        mutationKey: ["itemDeleteSeller"],
        mutationFn: itemDeleteSellerApi,
        onSuccess: () => {
            Swal.fire({
                title: "Deleted!",
                text: "Item deleted successfully.",
                icon: "success"
            });
            refetch();
        }
    })
    return itemDeleteSellerMutation;
};

export default useFetchItemDeleteSeller;