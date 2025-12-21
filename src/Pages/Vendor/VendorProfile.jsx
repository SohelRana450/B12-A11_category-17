import React from 'react';
import useAuth from '../../Hooks/useAuth';

const VendorProfile = () => {
    const {user} = useAuth()
    return (
        <div className='flex justify-center pt-100'>
            <img className='w-30 h-30 rounded-full flex justify-center items-center' src={user.photoURL} alt="" />
        </div>
    );
};

export default VendorProfile;