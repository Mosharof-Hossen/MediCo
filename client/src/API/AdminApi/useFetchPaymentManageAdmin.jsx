import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const useFetchPaymentManageAdmin = () => {
    const axios = useAxios();
    const paymentManageAPI = async () => {
        const res = await axios.get(`/payment-manage-admin`);
        return res.data;
    }
    return useQuery({
        queryKey: ["paymentManageAdmin"],
        queryFn: () => paymentManageAPI(),
    })
};

export default useFetchPaymentManageAdmin;