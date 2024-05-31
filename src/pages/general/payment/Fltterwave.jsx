/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

// import { useRef } from 'react';
import { forwardRef } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';


const FlutterwavePayment = forwardRef(({ email, amount, onSuccess, onClose }, ref) => {
    
    const publicKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY; // Replace with your flutterwave public key



    const config = {
        public_key: publicKey,
        tx_ref: Date.now(),
        amount: amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: email,
           phone_number: '070********',
          name: 'john doe',
        },
        customizations: {
          title: 'Cinemation Payment',
          description: 'Payment for items in cart',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };

      const handleFlutterPayment = useFlutterwave(config);



    return (
            <button ref={ref}  
                onClick={() => {
                handleFlutterPayment({
                  callback: (response) => {
                     console.log(response);
                     onSuccess(response)
                      closePaymentModal() // this will close the modal programmatically
                  },
                  onClose: () => {
                    onClose()
                  },
                });
              }}
      
            >FlutterWave Hooks</button>
    );
});

export default FlutterwavePayment;
