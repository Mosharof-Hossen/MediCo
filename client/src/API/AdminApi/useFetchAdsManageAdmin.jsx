import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useFetchAdsAdmin from "./useFetchAdsAdmin";

const useFetchAdsManageAdmin = () => {
    const { refetch } = useFetchAdsAdmin();
    const axios = useAxios();
    const adsManageApi = async (data) => {
        const res = await axios.patch(`/ads-manage-admin`, data);
        return res.data;
    }
    const adsManageAdminMutation = useMutation({
        mutationKey: ['manageAds',],
        mutationFn: adsManageApi,
        onSuccess: () => {
            refetch()
        }
    })

    return adsManageAdminMutation;
};

export default useFetchAdsManageAdmin;