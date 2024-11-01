import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const useFetchGetSlideData = () => {
    const axios = useAxios();
    const slideDataAPI = async () => {
        const res = await axios.get("/slide-data");
        return res.data;
    }
    return useQuery({
        queryKey: ["getSlideData"],
        queryFn: () => slideDataAPI(),
    })
};

export default useFetchGetSlideData;