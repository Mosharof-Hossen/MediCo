import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const useFetchGetItem = (categories, isDiscounted, searchQuery) => {
    const axios = useAxios();
    console.log(categories);
    return useQuery({
        queryKey: ['items', categories, isDiscounted, searchQuery],
        queryFn: async () => {

            // const queryString = categories.join(",");
            const res = await axios.get(`/items`, {
                params: {
                    selectedCategories: categories,
                    isDiscounted: isDiscounted,
                    searchQuery: searchQuery
                }
            })
            return res.data
        },

    })
}
export default useFetchGetItem;