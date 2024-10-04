import axios from 'axios';
import { useEffect } from 'react';
import useAuthContext from './useAuthContext';

const instance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})
const useAxios = () => {
    const { logout } = useAuthContext()
    useEffect(() => {
        instance.interceptors.response.use(
            (res) => {
                return res;
            },
            (err) => {
                if (err?.response?.status === 403 || err?.response?.status === 404) {
                    logout()
                }
            }
        )
    }, [logout])


    return instance
};

export default useAxios;