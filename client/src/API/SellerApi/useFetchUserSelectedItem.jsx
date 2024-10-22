import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const useFetchUserSelectedItem = (id) => {
    const axios = useAxios(); 
    const fetchItemById = async (ids) => {
        console.log(ids);
        const res = id && await axios.get(`/user-selected-items/${ids}`);
        return res.data;
    }
    return useQuery({
        queryKey: ['userSelectedItems', id],
        queryFn: () => fetchItemById(id),
        enabled:  !!(id),
    })
};

export default useFetchUserSelectedItem;