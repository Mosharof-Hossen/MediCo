import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const useFetchAdsAdmin = () => {
    const axios = useAxios();
    const getAdsApi = async () => {
        const res = await axios.get(`/ads-admin`);
        return res.data;
    }
    return useQuery({
        queryKey: ["getAdsApi"],
        queryFn: () => getAdsApi(),
    })
};

export default useFetchAdsAdmin;