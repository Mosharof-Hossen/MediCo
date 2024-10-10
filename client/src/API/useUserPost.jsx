import { useMutation } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Swal from 'sweetalert2'

const useUserPost = () => {
    const axios = useAxios();
    const userPostFunction = async (data) => {
        const res = await axios.post(`/users`, data);
        return res.data;
    }

    const userMutation = useMutation({
        mutationKey: ["userCreation"],
        mutationFn: userPostFunction,
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Sign-Up Done",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })

    return userMutation;
};

export default useUserPost;