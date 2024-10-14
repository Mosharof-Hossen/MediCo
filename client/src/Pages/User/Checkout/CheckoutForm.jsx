import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useFetchGetCartItem from '../../../API/UserApi/useFetchGetCartItem';
import { useEffect, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axios = useAxios();
    const { data: cartItem, isLoading, isError } = useFetchGetCartItem();
    const [err, setErr] = useState("");
    const totalPrice = cartItem?.reduce((acc, cur) => acc + cur.itemDetails.perUnitPrice * cur.quantity, 0)
    const [clientSecret, setClientSecret] = useState("")
    useEffect(() => {
        if (totalPrice) {
            axios.post(`/create-payment-intent`, { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.client_secret)
                })
        }
    }, [totalPrice, axios])


    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }

    console.log(clientSecret);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErr(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setErr("")
        }


    }

    return (
        <div className=' p-10 '>

            <form onSubmit={handleSubmit} className='text-center space-y-5  py-10 md:px-10 px-2 bg-white'>
                <h1 className='text-gray-500 text-2xl font-semibold'>Total Price - {totalPrice}</h1>

                <CardElement
                    className='lg:mx-32 mx-auto border p-5 rounded'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe} className='bg-primary-c text-white px-3 py-1 rounded text-xl'>
                    Pay
                </button>
                <p className='text-xs text-red-600 font-semibold'>{err}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;