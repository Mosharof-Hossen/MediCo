// import { useEffect } from 'react';
// import useAuthContext from './useAuthContext';
import axios from 'axios';


const publicInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})
const usePublicAxios = () => {
    // const { logout } = useAuthContext()
    // useEffect(() => {
    //     publicInstance.interceptors.response.use(
    //         (res) => {
    //             return res;
    //         },
    //         (err) => {
    //             if (err?.response?.status === 403 || err?.response?.status === 404) {
    //                 logout()
    //             }
    //         }
    //     )
    // }, [logout])


    return publicInstance
};

export default usePublicAxios;