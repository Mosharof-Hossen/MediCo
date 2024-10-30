import useAxios from '../../Hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import useFetchGetAllCategories from '../useFetchGetAllCategories';

const useFetchCreateCategoryAdmin = () => {
    const {refetch } = useFetchGetAllCategories()
    const axios = useAxios();
    const createCategoryApi = async (data) => {
        const res = await axios.post(`/create-category`, data);
        return res.data;
    }
    const createCategoryMutation = useMutation({
        mutationKey:["createCategory"],
        mutationFn:createCategoryApi,
        onSuccess:()=>{
            document.getElementById("addCategoryModal").close();
            refetch();
        }
    })
    return createCategoryMutation
};

export default useFetchCreateCategoryAdmin;