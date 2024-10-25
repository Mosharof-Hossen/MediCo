import useAxios from "../../Hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

const useFetchAddAdsSeller = () => {
    const axios = useAxios();
    const createAdsApi = async (data) => {
        const res = await axios.post(`/create-ads-seller`, data);
        return res.data
    }
    const createAdsSellerMutation = useMutation({
        mutationKey: ['createAdsSeller'],
        mutationFn: createAdsApi,
        onSuccess: () => {
            document.getElementById("addAdsModal").close();
        }
    })
    return createAdsSellerMutation
};

export default useFetchAddAdsSeller;