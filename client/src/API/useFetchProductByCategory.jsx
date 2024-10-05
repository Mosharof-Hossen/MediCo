import useAxios from '../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const useFetchProductByCategory = (category) => {
    const axios = useAxios();
    const fetchProductByCategory = async (category) => {
        const res = await axios.get(`/products/${category}`);
        return res.data;
    }

    return useQuery({
        queryKey:["productByCategory",category],
        queryFn:()=>fetchProductByCategory(category),
        enabled: !!category,
    })
};

export default useFetchProductByCategory;