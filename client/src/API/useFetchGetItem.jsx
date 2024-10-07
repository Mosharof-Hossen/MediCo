import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const useFetchGetItem = (categories, isDiscounted, searchQuery, sort, itemPerPage, currentPage) => {
    const axios = useAxios();
    return useQuery({
        queryKey: ['items', categories, isDiscounted, searchQuery, sort, itemPerPage, currentPage],
        queryFn: async () => {

            // const queryString = categories.join(",");
            const res = await axios.get(`/items`, {
                params: {
                    selectedCategories: categories,
                    isDiscounted: isDiscounted,
                    searchQuery: searchQuery,
                    sort: sort,
                    itemPerPage: itemPerPage,
                    currentPage: currentPage
                }
            })
            return res.data
        },

    })
}
export default useFetchGetItem;