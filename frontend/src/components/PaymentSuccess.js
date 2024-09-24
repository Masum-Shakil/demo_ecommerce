import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentSuccess = () => {
    // console.log("OK")
    // // const transactionId = new URLSearchParams(window.location.search).get('tran_id');
    // const { tran_id, amount } = useParams();

    // useEffect(() => {
    //     const verifyPayment = async () => {
    //         try {
    //             const response = await axios.post('http://127.0.0.1:8000/api/ecommerce/payment_verification/', {
    //                 tran_id: tran_id,
    //                 amount: amount
    //             });

    //             if (response.status === 200) {
    //                 alert('Payment verified successfully!');
    //             }
    //         } catch (error) {
    //             console.error('Payment verification failed', error);
    //             alert('Payment verification failed. Please contact support.');
    //         }
    //     };

    //     verifyPayment();
    // }, [tran_id, amount]);

    return <h2>Verifying your payment...</h2>;
};

export default PaymentSuccess;