import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const useFetchGetItem = () => {
    const axios = useAxios();
    const getItem = async () => {
        const res = await axios.get(`/items`,);
        return res.data;
    }
    return useQuery({
        queryKey: ['items'],
        queryFn: getItem,
    })
}
export default useFetchGetItem;