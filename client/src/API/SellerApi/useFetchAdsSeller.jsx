import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuthContext from "../../Hooks/useAuthContext";

const useFetchAdsSeller = () => {
    const { user, waitForUser } = useAuthContext()
    const axios = useAxios();
    const getAdsSellerApi = async (id) => {
        const res = await axios.get(`/ads-seller/${id}`)
        return res.data;
    }

    return useQuery({
        queryKey: ["getAdsSeller", user?.uid],
        queryFn: () => getAdsSellerApi(user?.uid),
        enabled: waitForUser && !!(user?.uid)
    })
};

export default useFetchAdsSeller;