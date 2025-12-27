import React from 'react';
import { FaBusAlt } from 'react-icons/fa';
import imageIcon from '../assets/icon.png'



const Logo = () => {
    return (
        <div className='flex -ml-2 rounded-xl'>
          <img className='w-18 h-14 ' src={imageIcon} alt="" />
    <h1 className='font-bold text-2xl md:text-3xl flex items-center  '> <span className='-ml-3'>Ticket.com </span></h1>
  </div>
    );
};

export default Logo;