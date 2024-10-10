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

        instance.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");
            console.log(token);
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config
        }, (err) => {
            return Promise.reject(err);
        })

        instance.interceptors.response.use(
            (res) => {
                return res;
            },
            (err) => {
                if (err?.response?.status === 403 || err?.response?.status === 404) {
                    logout();
                    localStorage.removeItem("token");
                }
            }
        )
    }, [logout])


    return instance
};

export default useAxios;