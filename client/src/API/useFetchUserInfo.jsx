import useAuthContext from '../Hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';

const useFetchUserInfo = () => {
    const { user, waitForUser } = useAuthContext();
    const axios = useAxios();
    const fetchMethod = async () => {
        const res = await axios.get("/userInfo", {
            params: {
                email: user?.email,
                uid: user?.uid
            }
        })
        return res.data;
    }


    return useQuery({
        queryKey: ["UserInfo", user?.email, user?.uid],
        queryFn: fetchMethod,
        enabled: waitForUser && !!(user?.email || user?.uid),
    })
};

export default useFetchUserInfo;