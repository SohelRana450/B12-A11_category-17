import React from 'react';
import { FaBusAlt } from 'react-icons/fa';

const Logo = () => {
    return (
        <div>
    <h1 className='font-bold text-2xl md:text-3xl flex items-center gap-2 text-[#666666]'><FaBusAlt className='text-[#69306d]'/>Ticket.com </h1>
  </div>
    );
};

export default Logo;