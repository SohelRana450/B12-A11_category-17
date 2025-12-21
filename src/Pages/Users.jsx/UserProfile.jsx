import React from 'react';
import useAuth from '../../Hooks/useAuth';

const UserProfile = () => {
    const {user} = useAuth()
    return (
        <div className='flex justify-center items-center h-screen'>
      <div className='bg-white shadow-lg rounded-2xl w-full mx-auto h-full'>
        <img
          alt='cover photo'
          src={user?.photoURL}
          className='w-full mb-4 rounded-t-lg h-110'
        />
        <div className='flex flex-col items-center justify-center px-20 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center gap-20 justify-center text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-gray-600 '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-gray-600 '>{user?.email}</span>
              </p>

              <div>
                <button className='bg-lime-500  px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1'>
                  Update Profile
                </button>
                <button className='bg-lime-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800'>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default UserProfile;