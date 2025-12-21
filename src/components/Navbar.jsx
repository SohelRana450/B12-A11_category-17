import React, { useEffect, useState } from 'react'
import Logo from './Logo';
import MyLink from './MyLink';
import { Link } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
    const {user,logOut} = useAuth()

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
    }
    return (

 <div className='bg-fuchsia-200 text-black'>
        <div className="w-11/12 mx-auto flex justify-between items-center py-2">
  <div className="flex items-center">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pt-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-[#B6AE9F] text-[#062941] font-bold rounded-box z-100 mt-2 w-52 p-2 ">
    <li><MyLink to="/">Home</MyLink></li>           
 
            <li><MyLink to="/all-tickets">All Tickets</MyLink></li>
       <li><MyLink to="/dashboard">Dashboard</MyLink></li>
       
   
      </ul>
    </div>
   <div className='font-extrabold text-3xl ' ><Logo></Logo></div>
  </div>
  <div className='flex items-center gap-5'>
    <div className=" hidden lg:flex">
    <ul className="flex gap-4 px-1 text-sm">
         <li><MyLink to="/">Home</MyLink></li>           
 
            <li><MyLink to="/all-tickets">All Tickets</MyLink></li>
            <li><MyLink to="/dashboard" className="">Dashboard</MyLink></li>
       
       
    </ul>
  </div>
  <div className="space-x-3 flex items-center">
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
</div>
       </div>
    );
};

export default Navbar;