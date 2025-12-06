import React from 'react'
import Logo from './Logo';
import MyLink from './MyLink';

const Navbar = () => {

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
  <div className="space-x-4 ">
    <button className='btn btn-active bg-[#bde0fe] rounded-xl border-0'>Log In</button>
    <button className='btn btn-active bg-[#ffc8dd] rounded-xl border-0'>Register</button>
  </div>
</div>
    );
};

export default Navbar;