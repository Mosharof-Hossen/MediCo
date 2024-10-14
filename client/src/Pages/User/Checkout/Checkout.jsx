import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);



const Checkout = () => {
    
    return (
        <div className='bg-slate-100 min-h-screen'>
            <SectionTitle heading={"Payment"} subHeading={"Ready!!"}></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;