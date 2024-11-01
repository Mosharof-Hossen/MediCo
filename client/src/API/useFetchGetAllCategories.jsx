import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const useFetchGetAllCategories = () => {
    const axios = useAxios();

    const allCategory = async () => {
        const res = await axios.get(`/all-category`);
        return res.data;
    }
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ["All-category"],
        queryFn: allCategory,
    })
    return { data, isError, isLoading, refetch }
};

export default useFetchGetAllCategories;