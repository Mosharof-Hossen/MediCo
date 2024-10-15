import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useFetchGetCartItem from "./useFetchGetCartItem";

const useFetchPayment = () => {
    const axios = useAxios();
    const navigate = useNavigate();
    const { refetch } = useFetchGetCartItem();

    const paymentApi = async (data) => {
        const res = await axios.post("/payment", data)
        return res.data;
    }
    const paymentMutation = useMutation({
        mutationKey: ["payment"],
        mutationFn: paymentApi,
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your payment successfully done",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate("/dashboard/user/payment-history")
                refetch();

            })
        }
    })
    return paymentMutation;
};

export default useFetchPayment;