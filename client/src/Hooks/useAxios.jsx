import axios from 'axios';
// import { useEffect } from 'react';
import useAuthContext from './useAuthContext';
import { useNavigate } from "react-router-dom";

const instance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})
const useAxios = () => {
    const { logout } = useAuthContext()
    const navigate = useNavigate();

    // useEffect(() => {

    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        // console.log(token);
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
                navigate("/login")
            }
        }
    )
    // }, [logout, navigate])


    return instance
};

export default useAxios;