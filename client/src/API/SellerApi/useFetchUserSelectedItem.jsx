import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const useFetchUserSelectedItem = (id) => {
    const axios = useAxios(); 
    const fetchItemById = async (ids) => {
        const res = id && await axios.get(`/user-selected-items/${ids}`);
        return res.data[0];
    }
    return useQuery({
        queryKey: ['userSelectedItems', id],
        queryFn: () => fetchItemById(id),
        enabled:  !!(id),
    })
};

export default useFetchUserSelectedItem;