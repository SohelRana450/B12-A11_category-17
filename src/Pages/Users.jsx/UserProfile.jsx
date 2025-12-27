import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import Pending from '../../components/Pending';


const UserProfile = () => {
    const {user} = useAuth()
    const [role,isRoleLoading] = useRole();
    if(isRoleLoading){
      return <Pending/>
    }
    return (
       <div className=' rounded-xl flex justify-center items-center py-8'>
      <div className=' w-full px-2 lg:w-5/9'>
        <img
          alt='cover photo'
          src={user?.photoURL}
          className='w-full mb-4 rounded-t-lg md:h-70 h-56'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-20'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='py-1 px-6 my-2 font-medium text-white bg-pink-500 rounded-full'>
        {role}
          </p>
          
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-col md:flex-row items-left justify-between space-y-3 px-20 md:px-0 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold  '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold  '>{user?.email}</span>
              </p>

              <div>
                <button className='bg-pink-500  px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-pink-800 block mb-1'>
                  Update Profile
                </button>
                <button className='bg-pink-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-pink-800'>
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