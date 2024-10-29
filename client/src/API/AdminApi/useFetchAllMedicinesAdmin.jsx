import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const useFetchAllMedicinesAdmin = () => {
    const axios = useAxios();
    const allMedicineAdminAPI = async () => {
        const res = await axios.get("/all-medicine");
        return res.data;
    }
    return useQuery({
        queryKey:["AllMedicinesAdmin"],
        queryFn:()=>allMedicineAdminAPI(),
    })
};

export default useFetchAllMedicinesAdmin;