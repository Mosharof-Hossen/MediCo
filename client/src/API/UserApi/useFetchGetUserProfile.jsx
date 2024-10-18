import useAuthContext from '../../Hooks/useAuthContext';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const useFetchGetUserProfile = () => {
    const { user, waitForUser } = useAuthContext();
    const axios = useAxios();

    const profileAPI = async (uid) => {
        const res = await axios.get(`/profile-info/${uid}`);
        return res.data
    }
    return useQuery({
        queryKey: ["profileInfo"],
        queryFn: () => profileAPI(user.uid),
        enabled: waitForUser && !!(user?.uid)
    })
};

export default useFetchGetUserProfile;