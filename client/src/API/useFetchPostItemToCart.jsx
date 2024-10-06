import useAxios from '../Hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { Store } from 'react-notifications-component';


const useFetchPostItemToCart = () => {

    const axios = useAxios();
    const selectItem = async (item) => {
        const res = await axios.post(`/addToCart`, item);
        return res.data;
    }
    const addItemToCartMutation = useMutation({
        mutationKey: ["addItemToCart"],
        mutationFn: selectItem,
        onSuccess: () => {
            Store.addNotification({
                title: "Item added to cart!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                }
              });
        }
    })
    return addItemToCartMutation
};

export default useFetchPostItemToCart;