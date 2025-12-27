import React, { useEffect, useState } from 'react';
import { BsMegaphone } from 'react-icons/bs';
import { FaUser, FaUsers } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { TiTicket } from 'react-icons/ti';
import { NavLink, Outlet, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
    const {user,logOut} = useAuth()
    const navigate = useNavigate()

    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

    useEffect(()=>{
        const html = document.querySelector('html')
        html.setAttribute('data-theme',theme)
        localStorage.setItem("theme",theme)
    },[theme])

    const handleTheme = (checked)=>{
        setTheme(checked ? "dark" : "light")
    }

    const handleLogOut = () =>{
        logOut()
        .then()
        .catch()
        navigate('/')
    }
    
    return (
        <div>
            <div className="flex h-screen  ">

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50  z-40 transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div
        className={`fixed left-0 top-19 right-10 rounded-xl bg-gray-900   text-white p-6 z-50 transform transition-transform duration-300 md:hidden ${open ? "translate-x-3" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between  mb-6">
          <h1 className="dropdown text-xl font-bold border-b-2">Admin Dashboard</h1>
          
          <button
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 active:scale-90 transition"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav  onClick={() => setOpen(false)} className="space-y-3 menu menu-vertical dropdown-left">
         
          <NavLink to="/dashboard/admin/profile" className="flex gap-2 items-center"><FaUser size={18} />Admin Profile   </NavLink>
          <NavLink to="/dashboard/admin/manage-tickets" className="flex gap-2 items-center"><TiTicket size={18} />Manage Tickets</NavLink>
          <NavLink to="/dashboard/admin/manage-users" className="flex gap-2 items-center"><FaUsers size={18} />Manage Users</NavLink>
          <NavLink to="/dashboard/admin/advertise-tickets" className="flex gap-2 items-center"><BsMegaphone size={18} />Advertise Tickets</NavLink>
          <NavLink to="/" className="flex gap-2 items-center "><IoMdHome size={18} />Home</NavLink>
          
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-60  p-6 space-y-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <span className='hidden md:block bg-gray-300 w-5 lg:w-42 h-0.5 -mt-6'/>
        <nav className="space-y-3">
            <NavLink to="/dashboard/admin/profile" className="flex gap-2 items-center"><FaUser size={18} />Admin Profile   </NavLink>
          <NavLink to="/dashboard/admin/manage-tickets" className="flex gap-2 items-center"><TiTicket size={18} />Manage Tickets</NavLink>
          <NavLink to="/dashboard/admin/manage-users" className="flex gap-2 items-center"><FaUsers size={18} />Manage Users</NavLink>
          <NavLink to="/dashboard/admin/advertise-tickets" className="flex gap-2 items-center"><BsMegaphone size={18} />Advertise Tickets</NavLink>
          <NavLink to="/" className="flex gap-2 items-center "><IoMdHome size={18} />Home</NavLink>
          
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-5 md:pr-5  overflow-y-auto">
        {/* Top Navbar */}
        <div className='flex justify-between items-center '>
          <div className="flex items-center justify-between  gap-5 mb-6">
          <button
            className="md:hidden flex flex-col gap-1 p-2 ml-6 rounded-lg bg-gray-200 dark:bg-gray-800 transition active:scale-90"
            onClick={() => setOpen(true)}
          >
            <span className="block w-6 h-0.5 bg-gray-900 dark:bg-white transition" />
            <span className="block w-6 h-0.5 bg-gray-900 dark:bg-white transition" />
            <span className="block w-6 h-0.5 bg-gray-900 dark:bg-white transition" />
          </button>
         <div>
           <h2 className="text-xl font-semibold  ">Admin Panel</h2>
          <span className="block -ml-0.5 w-29 h-0.5 bg-gray-300" />
         </div>

        </div>
        <div className="space-x-3 flex items-center mb-6 pr-10 ">
   {
    user?.photoURL ? (
    
    <div className="dropdown dropdown-hover dropdown-end">
  <div tabIndex={0} role="" className="">
    <img className='w-10 h-10 rounded-full' src={user.photoURL} alt={user?.displayName} />
    </div>

  <ul tabIndex={-1} className="dropdown-content   bg-[#a09d97] text-[#062941] rounded-box z-50 w-40 p-2 space-y-2 shadow">
    <li className='space-x-2'><input onChange={(e)=> handleTheme(e.target.checked)} type="checkbox" defaultValue={localStorage.getItem('theme')==="dark"} className='toggle' /><span className='text-xs'>Theme Toggle</span></li>
    <li><h3 className='hover:bg-[#B6AE9F] p-2 rounded-xl text-sm flex items-center gap-3'><img className='w-7 h-7 rounded-full' src={user.photoURL} alt="" />{user.displayName}</h3></li>
    
    
    <li><button onClick={handleLogOut} className='btn btn-sm btn-secondary w-full rounded-xl font-bold '>Log Out</button></li>
  </ul>
</div>
) 
:  
  (<div className='space-x-3'>
     <Link to="/auth/login" className='btn btn-secondary rounded-xl font-bold '>Log In</Link>
    <Link to="/auth/register" className='btn btn-secondary rounded-xl font-bold '>Register</Link>
  </div>)
   }
  </div>
        </div>

        {/* Main Page Content Slot */}
        <div className=" min-h-[400px]">
        
          <Outlet/>
        </div>
      </div>
    </div>
        </div>
    );
};

export default AdminSidebar;