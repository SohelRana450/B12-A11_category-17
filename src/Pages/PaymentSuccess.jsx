
import React, { useEffect } from 'react';
import { IoBagCheckOutline } from 'react-icons/io5';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    useEffect(()=>{
        if(sessionId){
            axiosSecure.post(`/payment-success`,{sessionId})
        }
        
    },[sessionId,axiosSecure])
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
      <div className='bg-amber-200 p-10 rounded-lg shadow-lg text-center'>
        <IoBagCheckOutline className='w-16 h-16 text-green-500 mx-auto mb-4' />
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          Payment Successful!
        </h1>
        <p className='text-gray-600 mb-6'>
          Thank you for your purchase. Your order is being processed.
        </p>
        <div className='space-x-8'>
            <Link
          to='/dashboard/user/booked-tickets'
          className='inline-block bg-pink-500 text-white font-semibold py-2 px-4 rounded hover:bg-pink-600 transition duration-300'
        >
          Book Tickets
        </Link>
        <Link to="/" className='inline-block bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 transition duration-300'>Back to Homepage</Link>
        </div>
      </div>
    </div>
    );
};

export default PaymentSuccess;