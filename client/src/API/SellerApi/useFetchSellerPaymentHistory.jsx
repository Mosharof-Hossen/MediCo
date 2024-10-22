import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../Hooks/useAuthContext";
import useAxios from "../../Hooks/useAxios";

const useFetchSellerPaymentHistory = () => {
    const { user, waitForUser } = useAuthContext();
    const axios = useAxios();
    const paymentHistoryAPI = async (uid) => {
        const res = await axios.get(`/seller/payment-history/${uid}`)
        return res.data;
    }

    return useQuery({
        queryKey:['sellerPaymentHistory'],
        queryFn: ()=> paymentHistoryAPI(user.uid),
        enabled: waitForUser && !!(user?.uid)
    })
};

export default useFetchSellerPaymentHistory;