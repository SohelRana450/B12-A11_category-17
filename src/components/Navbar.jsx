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
        <div className="flex justify-between items-center pt-4">
      
  <div className="flex items-center">
    <div className="dropdown">
      
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><MyLink to="/all-tickets">All Tickets</MyLink></li>
        <li><MyLink to="/dashboard">Dashboard</MyLink></li>
        
        
      </ul>
    </div>
    <div>
        <Logo></Logo>
        
    </div>
  </div>
  <div className=" hidden lg:flex">
    <ul className="flex gap-3 px-1">
     <li><MyLink to="/all-tickets" >All Tickets</MyLink></li>
        <li><MyLink to="/dashboard">Dashboard</MyLink></li>
    </ul>
  </div>

 <div className=''>
     {
    user?.photoURL ? 
    (
        <div className='dropdown dropdown-hover dropdown-end'>
            <div tabIndex={0} className='pr-1'>
        <img className='w-12 h-10 rounded-full items-center justify-center mx-auto' src={user?.photoURL} alt={user.displayName} />
        <h4 className='text-sm font-medium'>{user.displayName}</h4>
    </div>
    <ul tabIndex={-1} className="dropdown-content   bg-[#a09d97] text-[#062941] rounded-box z-50 w-40 p-2 space-y-2 shadow">
    <li className='space-x-2'><input onChange={(e)=>handleTheme(e.target.checked)} type="checkbox" defaultValue={localStorage.getItem('theme')==="dark"} className='toggle' /><span className='text-xs'>Theme Toggle</span></li>
    <li><h3 className='hover:bg-[#B6AE9F] p-2 pl-3 rounded-xl text-sm text-center flex items-center gap-2'><FaUser />My Profile</h3></li>
    
    <li><button onClick={handleLogOut}  className='btn btn-sm btn-secondary w-full rounded-xl font-bold '>Log Out</button></li>
  </ul>
        </div>
    ) :
    (
        <div className="space-x-4 ">
    <Link to="/auth/login" className='btn btn-active bg-[#bde0fe] rounded-xl border-0'>Log In</Link>
    <Link to="/auth/register" className='btn btn-active bg-[#ffc8dd] rounded-xl border-0'>Register</Link>
  </div>
    )
  }
 </div>
</div>
    );
};

export default Navbar;