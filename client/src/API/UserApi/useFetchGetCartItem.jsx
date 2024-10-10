import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuthContext from "../../Hooks/useAuthContext";

const useFetchGetCartItem = () => {
    const { user, waitForUser } = useAuthContext();
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
        queryFn: () => getMethod({ email: user?.email, uid: user?.uid }),
        enabled: waitForUser && !!(user?.email || user?.uid),
    })
};

export default useFetchGetCartItem;