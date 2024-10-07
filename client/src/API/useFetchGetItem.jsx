import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const useFetchGetItem = (categories, isDiscounted) => {
    const axios = useAxios();
    console.log(categories);
    return useQuery({
        queryKey: ['items', categories, isDiscounted],
        queryFn: async () => {

            // const queryString = categories.join(",");
            const res = await axios.get(`/items`, {
                params: {
                    selectedCategories: categories,
                    isDiscounted: isDiscounted
                }
            })
            return res.data
        },

    })
}
export default useFetchGetItem;