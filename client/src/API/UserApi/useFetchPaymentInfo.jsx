import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuthContext from "../../Hooks/useAuthContext";

const useFetchPaymentInfo = () => {
    const axios = useAxios();
    const { user, waitForUser } = useAuthContext();

    const paymentApi = async (email, uid) => {
        const res = await axios.get(`/payment/${email}/${uid}`)
        return res.data;
    }
    return useQuery({
        queryKey: ["payment"],
        queryFn: () => paymentApi(user?.email, user?.uid),
        enabled: waitForUser && !!(user?.email || user.uid),
    })
};

export default useFetchPaymentInfo;