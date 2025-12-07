import React from 'react';
import { FaBusAlt } from 'react-icons/fa';

const Logo = () => {
    return (
        <div>
    <h1 className='font-bold text-2xl md:text-3xl flex items-center gap-2 '><FaBusAlt className='text-[#edaff1]'/>Ticket.com </h1>
  </div>
    );
};

export default Logo;