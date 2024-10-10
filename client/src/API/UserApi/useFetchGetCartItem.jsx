import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const useFetchGetCartItem = (user) => {
    const axios = useAxios();
    const getMethod = async (user) => {
        const res = await axios.get("/user/cart", {
            params: {
                user: user
            }
        })
        return res.data;
    }
    return useQuery({
        queryKey: ["getCart", user],
        queryFn: () => getMethod(user),
    })
};

export default useFetchGetCartItem;