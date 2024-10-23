import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useFetchSellerPaymentHistory from "./useFetchSellerPaymentHistory";

const useFetchDeliveryStatusSeller = () => {
    const axios = useAxios();
    const { refetch } = useFetchSellerPaymentHistory();
    const deliveryStatusAPI = async (data) => {
        const res = await axios.put("/delivery-status", data)
        return res.data;
    }
    const deliveryStatusMutation = useMutation({
        mutationKey: ['deliveryStatus'],
        mutationFn: deliveryStatusAPI,
        onSuccess: () => {
            refetch()
        }
    })
    return deliveryStatusMutation
};

export default useFetchDeliveryStatusSeller;