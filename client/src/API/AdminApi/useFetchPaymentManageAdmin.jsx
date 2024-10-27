import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const useFetchPaymentManageAdmin = (date) => {
    const axios = useAxios();
    const paymentManageAPI = async () => {
        const res = await axios.get(`/payment-manage-admin`, {
            params: { date }
        });
        return res.data;
    }
    return useQuery({
        queryKey: ["paymentManageAdmin",date],
        queryFn: () => paymentManageAPI(),
    })
};

export default useFetchPaymentManageAdmin;