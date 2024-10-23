import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../Hooks/useAuthContext";
import useAxios from "../../Hooks/useAxios";

const useFetchManageMedicinesSeller = () => {
    const { user, waitForUser } = useAuthContext();
    const axios = useAxios();
    const getSellerMedicinesAPI = async (id) => {
        const res = await axios.get(`/manage-medicines-seller/${id}`);
        return res.data;
    }
    return useQuery({
        queryKey: ['getMedicinesSeller', user?.uid],
        queryFn: () => getSellerMedicinesAPI(user?.uid),
        enabled: waitForUser && !!(user?.uid)
    })
};

export default useFetchManageMedicinesSeller;