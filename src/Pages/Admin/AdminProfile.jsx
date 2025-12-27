import React from 'react';
import useRole from '../../Hooks/useRole';
import useAuth from '../../Hooks/useAuth';
import Pending from '../../components/Pending';

const AdminProfile = () => {
    const {user} = useAuth()
   
    const [role,isRoleLoading,] = useRole();
    
    if(isRoleLoading){
      return <Pending/>
    }
    return (
         <div className=' flex justify-center items-center py-8 rounded-xl'>
      <div className=' px-2 w-full lg:w-5/9'>
        <img
          alt='cover photo'
          src={user?.photoURL}
          className='w-full mb-4 rounded-t-lg md:h-70 h-56'
        />
        <div className='flex flex-col items-center justify-center mx-auto p-4 -mt-20'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='py-1 px-6 mt-2 font-medium text-lg text-white bg-lime-500 rounded-full'>
        {role}
          </p>
          
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-col md:flex-row space-y-3 px-20 md:px-0 justify-between text-sm  '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold  '>{user?.email}</span>
              </p>

              <div className=''>
                <button className='bg-lime-500  px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1'>
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

export default AdminProfile;