import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const useFetchAllUser = () => {
    const axios = useAxios();
    const allUserApi = async () => {
        const res = await axios.get("/all-user-admin");
        return res.data;
    }

    return useQuery({
        queryKey: ["allUserAdmin"],
        queryFn: () => allUserApi(),
    })
};

export default useFetchAllUser;