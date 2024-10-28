import { useMutation } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import useFetchAllUser from './useFetchAllUser';

const useFetchUpdateRoleAdmin = () => {
    const { refetch } = useFetchAllUser()
    const axios = useAxios();
    const updateRoleApi = async (data) => {
        const res = await axios.patch(`/update-role`, data);
        return res.data;
    }
    const updateRoleAdminMutation = useMutation({
        mutationKey: ["updateRole"],
        mutationFn: updateRoleApi,
        onSuccess: () => {
            refetch();
        }
    })
    return updateRoleAdminMutation;
};

export default useFetchUpdateRoleAdmin;