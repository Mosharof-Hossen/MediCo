import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const useFetchGetItem = (categories) => {
    const axios = useAxios();
    console.log(categories);
    return useQuery({
        queryKey: ['items', categories],
        queryFn: async () => {
            
            // const queryString = categories.join(",");
            const res = await axios.get(`/items`, {
                params: {
                    selectedCategories: categories
                }
            })
            return res.data
        },

    })
}
export default useFetchGetItem;