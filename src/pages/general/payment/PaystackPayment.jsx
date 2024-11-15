/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

// import { useRef } from 'react';
import { forwardRef } from 'react';
import { usePaystackPayment } from 'react-paystack';


const PaystackPayment = forwardRef(({ email, amount, onSuccess, onClose }, ref) => {
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY; // Replace with your Paystack public key



    const config = {
        reference: (new Date()).getTime().toString(),
        email:email,
        amount: amount, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: publicKey,
    };

    const initializePayment = usePaystackPayment(config);



    return (
            <button ref={ref}  onClick={() => {
                initializePayment(onSuccess,
                    onClose)
            }}></button>
    );
});

export default PaystackPayment;
