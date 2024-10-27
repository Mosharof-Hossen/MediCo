import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useFetchGetCartItem from '../../../API/UserApi/useFetchGetCartItem';
import { useEffect, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import useAuthContext from '../../../Hooks/useAuthContext';
import useFetchPayment from '../../../API/UserApi/useFetchPayment';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axios = useAxios();
    const { data: cartItem, isLoading, isError } = useFetchGetCartItem();
    const [err, setErr] = useState("");
    const [clientSecret, setClientSecret] = useState("")
    const { user } = useAuthContext();
    const paymentMutation = useFetchPayment();
    const [buttonDisable, setButtonDisable] = useState(false);

    const totalPrice = cartItem?.reduce((acc, cur) => acc + cur.itemDetails.perUnitPrice * cur.quantity, 0)
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

    const shortItemCartItem = cartItem?.reduce((acc, item) => {
        const { perUnitPrice } = item.itemDetails;

        const { sellerEmail } = item.seller;
        if (!acc[sellerEmail]) {
            acc[sellerEmail] = {
                sellerEmail: sellerEmail,
                sellerId: item.seller.sellerId,
                price: 0,
                items: []
            }
        }
        acc[sellerEmail].items.push(item.itemId);
        acc[sellerEmail].price += perUnitPrice;

        return acc;

    }, {})
    const shortCart = Object.entries(shortItemCartItem)?.map(item => item[1])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonDisable(true)

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErr(error.message)
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setErr("")
        }

        const { paymentIntent, error: confirmErr } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'unknown@gmail.com',
                    name: user.displayName || 'unknown'
                }
            }
        })

        if (confirmErr) {
            setButtonDisable(false)
            console.log(confirmErr);
        } else {
            setButtonDisable(false)
            if (paymentIntent.status === "succeeded") {
                // const payment = {
                //     transactionId: paymentIntent.id,
                //     userEmail: user.email,
                //     userId: user.uid,
                //     date: new Date(),
                //     itemIds: cartItem.map(item => item.itemId),
                //     status: "Pending",
                //     totalPrice: totalPrice
                // }
                const newPayment = shortCart.map(item => {
                    item["transactionId"] = paymentIntent.id,
                        item["userEmail"] = user.email,
                        item["userId"] = user.uid,
                        // item["date"] = new Date(),
                        item["status"] = "Pending",
                        item["totalPrice"] = totalPrice
                    return item;
                })

                paymentMutation.mutate(newPayment)
            }
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
                <button type="submit" disabled={!stripe || buttonDisable} className='bg-primary-c text-white px-3 py-1 rounded text-xl'>
                    Pay
                </button>
                <p className='text-xs text-red-600 font-semibold'>{err}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;