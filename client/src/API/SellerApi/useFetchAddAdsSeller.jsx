import useAxios from "../../Hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import useFetchAdsSeller from "./useFetchAdsSeller";

const useFetchAddAdsSeller = () => {
    const { refetch } = useFetchAdsSeller();
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
            refetch()
        }
    })
    return createAdsSellerMutation
};

export default useFetchAddAdsSeller;